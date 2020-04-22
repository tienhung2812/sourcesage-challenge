FROM python:3.7

RUN mkdir /code
WORKDIR /code

COPY requirements.txt /code/requirements.txt
RUN pip3 install -r requirements.txt

COPY . /code/