# https://dockerize.io/guides/python-django-guide
FROM python:3.8

RUN ls
RUN python --version
RUN pip install --upgrade pip
RUN pip install Django==4.1

# COPY ./azure_project_api/requirements.txt requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt


# Mounts the application code to the image
COPY . code
WORKDIR /code

EXPOSE 8000