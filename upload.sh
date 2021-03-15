#!/bin/bash

# git init

git add .

git commit -m "update"

git branch -M main

# git remote add origin https://github.com/nitasn/nitasn.github.io.git

git push -u origin main

echo 'done'
