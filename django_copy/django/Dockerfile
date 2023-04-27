
# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM python:3.7-alpine AS builder
EXPOSE 8000
WORKDIR /app 
COPY requirements.txt /app
RUN pip3 install -r requirements.txt --no-cache-dir
COPY . /app 
ENTRYPOINT ["python3"] 
CMD ["manage.py", "runserver", "0.0.0.0:8000"]

FROM builder as dev-envs
RUN <<EOF
apk update
apk add git
EOF

RUN <<EOF
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD ["manage.py", "runserver", "0.0.0.0:8000"]





# https://dockerize.io/guides/python-django-guide
# FROM python:3.8
# # //
# #  https://askubuntu.com/questions/906230/run-sudo-command-with-non-root-user-in-docker-container
# RUN apt-get update
# RUN apt-get install sudo

# RUN adduser --disabled-password --gecos '' admin
# RUN adduser admin sudo
# RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# USER admin

# # ////

# RUN sudo apt update
# RUN sudo apt install unixodbc-dev -y

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


# /////////////FROM --platform=$BUILDPLATFORM python:3.7-alpine AS builder
