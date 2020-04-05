# DjangoReactProject_Personal


Created with React + Redux, Django + Django Rest Framework.

### BackEnd: python manage.py runserver

### FrontEnd: npm start

## On server:  
### server host: http://199.116.235.221:3000/
### start FrontEnd: npm start &  
### stop FrontEnd:   
    -  lsof -i tcp:3000
    -  kill -9 PID
### start BackEnd: python3 manage.py runserver 0.0.0.0:8000 &  
### stop BackEnd:   
    -  ps auxw | grep runserver
    -  kill PID    

## Error solution:  

### 1. Mac env unable to install psycopg2  
        1.1 go to https://postgresapp.com/ and download postgresapp   
        1.2 export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.4/bin/   
            (the version should be different.)   
        1.3 pip3 install psycopg2  

### 2. python 3.6.5 fix mysqlclient issue.  
        2.1 go to https://www.python.org/downloads/release/python-365/   
        2.2 download macOS 64-bit installer   

### 3. sending emails from Django.
        3.1 go to https://www.google.com/settings/security/lesssecureapps
        3.2 turn it on.
        3.3 then it can login gmail in Django  

### 4. check mysql process:
        4.1 ps aux | grep mysqld  
        4.2 ps aux | grep mysql  
        4.3 killall -9 mysql  
        4.4 killall -9 mysqld  

### 5. ubuntu unable to install psycopg2
        5.1 sudo apt-get update
        5.2 sudo apt-get install libpq-dev python3-dev
        5.3 sudo pip3 install psycopg2

### 6. ubuntu django.db.utils.OperationalError 1698
        6.1 create user 'zuofu'@'%' identified by 'user_password';
        6.2 grant all on *.* to 'zuofu'@'%';
        6.3 flush privileges;
