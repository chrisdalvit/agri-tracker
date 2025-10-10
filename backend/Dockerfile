FROM python:3.13

WORKDIR /backend
COPY ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY ./src ./src
CMD [ "fastapi", "run", "src/main.py", "--port", "5000" ]