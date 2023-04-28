# https://dockerize.io/guides/python-django-guide
# FROM python:3.8
# FROM ubuntu:18.04

# #  https://askubuntu.com/questions/906230/run-sudo-command-with-non-root-user-in-docker-container
# RUN apt-get update
# RUN apt-get install sudo

# RUN adduser --disabled-password --gecos '' admin
# RUN adduser admin sudo
# RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# USER admin


# # ////

# RUN sudo apt update
# RUN sudo add-apt-repository ppa:deadsnakes/ppa
# RUN sudo apt install python3.11
# RUN sudo apt-get install python-pip python-dev -y
# RUN sudo apt-get update && sudo apt-get install -y gnupg2
# RUN sudo apt-get -y update
# RUN sudo apt-get -y install curl
# RUN sudo apt install unixodbc-dev -y
# RUN sudo apt-get install wget

# RUN sudo apt-get update -y 
# RUN sudo apt-get upgrade -y 
# RUN sudo apt-get install lsb-release -y 
# RUN sudo apt-get clean all


# RUN sudo su
# # RUN curl https://packages.microsoft.com/keys/microsoft.asc 
# # RUN sudo chmod 777 -R /usr/share/keyrings/
# # RUN sudo gpg --dearmor --yes -o /usr/share/keyrings/microsoft-keyring.gpg






# RUN sudo apt-get install -y unixodbc-dev 
# RUN sudo apt-get update
# RUN sudo apt-get upgrade 
# RUN sudo wget http://archive.ubuntu.com/ubuntu/pool/main/g/glibc/multiarch-support_2.27-3ubuntu1_amd64.deb
# RUN sudo apt-get install ./multiarch-support_2.27-3ubuntu1_amd64.deb -y && sudo apt-get update 
# RUN sudo curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
# RUN  sudo curl -fsSL https://packages.microsoft.com/config/ubuntu/18.04/prod.list -o /etc/apt/sources.list.d/mssql-release.list  
# RUN sudo apt-get update && sudo ACCEPT_EULA=Y apt-get install -y --allow-unauthenticated msodbcsql17
# RUN sudo apt-get update && sudo ACCEPT_EULA=Y apt-get install -y --allow-unauthenticated mssql-tools
# RUN sudo apt-get upgrade -y

# # # ////////////////////////

# # RUN sudo curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -

# # RUN sudo chmod 777 -R /etc/apt/
# # # RUN sudo chown root:admin /etc/apt/sources.list.d/mssql-release.list

# # RUN sudo curl https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/prod.list > /etc/apt/sources.list.d/mssql-release.list
# # # RUN sudo gpg --dearmor > /usr/share/keyrings/microsoft-keyring.gpg


# # RUN curl https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/prod.list > /etc/apt/sources.list.d/mssql-release.list


# # RUN sudo apt-get update
# # RUN sudo ACCEPT_EULA=Y apt-get install -y msodbcsql17
# # # optional: for bcp and sqlcmd
# # RUN sudo ACCEPT_EULA=Y apt-get install -y mssql-tools
# # RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
# # RUN source ~/.bashrc
# # # optional: for unixODBC development headers
# # RUN sudo apt-get install -y unixodbc-dev
# # # ///////////////////////////////

# # // 
# # RUN sudo apt-get update
# # RUN ACCEPT_EULA=Y sudo apt-get install msodbcsql17
# RUN ACCEPT_EULA=Y sudo apt-get -y install msodbcsql17 mssql-tools
# RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile \
# RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc \
# RUN sudo apt-get -y install unixodbc libc6 libstdc++6 libkrb5-3 libcurl3 openssl debconf unixodbc unixodbc-dev
# RUN pip install --upgrade pip
# # RUN pip install pyodbc
# RUN ls
# RUN python --version
# RUN sudo apt-get update
# RUN pip install --upgrade pip
# # RUN pip install Django==4.1

# COPY ./azure_project_api/requirements.txt requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt


# # Mounts the application code to the image
# COPY . code
# WORKDIR /code

# EXPOSE 8000


# # /////////////FROM --platform=$BUILDPLATFORM python:3.7-alpine AS builder

# base image  
FROM python:3.8   

RUN apt-get update
RUN apt-get install sudo

RUN adduser --disabled-password --gecos '' admin
RUN adduser admin sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER admin
# setup environment variable  
ENV DockerHOME=/home/app/webapp  

# set work directory  
RUN sudo mkdir -p $DockerHOME  

# where your code lives  
WORKDIR $DockerHOME  

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# install dependencies  
RUN sudo pip install --upgrade pip  
RUN sudo apt install unixodbc-dev -y
RUN sudo apt-get update

RUN sudo apt-get install -y unixodbc-dev 
RUN sudo apt-get update -y
RUN sudo apt-get upgrade -y 
RUN sudo wget http://archive.ubuntu.com/ubuntu/pool/main/g/glibc/multiarch-support_2.27-3ubuntu1_amd64.deb
RUN sudo apt-get install ./multiarch-support_2.27-3ubuntu1_amd64.deb -y && sudo apt-get update 
RUN sudo curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
RUN  sudo curl -fsSL https://packages.microsoft.com/config/ubuntu/18.04/prod.list -o /etc/apt/sources.list.d/mssql-release.list  
RUN sudo apt-get update && sudo ACCEPT_EULA=Y apt-get install -y --allow-unauthenticated msodbcsql17
RUN sudo apt-get update && sudo ACCEPT_EULA=Y apt-get install -y --allow-unauthenticated mssql-tools
RUN sudo apt-get upgrade -y

# copy whole project to your docker home directory. 
COPY . $DockerHOME  
# run this command to install all dependencies  
COPY ./azure_project_api/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt  
# port where the Django app runs  
EXPOSE 8000  
# start server  
CMD python manage.py runserver  