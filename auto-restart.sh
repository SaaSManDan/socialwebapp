#!/bin/bash
# finds if a file in the directory has been modified a second ago
if [[ -n $(find . -name "*" ! -name "restart.txt" ! -name "auto-restart.sh" ! -name "." ! -path "*tmp*" ! -name "*nohup.out*" ! -name "*swpc*" -mmin 0.1) ]] 
then
  echo A file has been modified.
  find . -name "*" ! -name "restart.txt" ! -name "auto-restart.sh" ! -name "." ! -path "*tmp*" ! -name "*nohup.out*" ! -name "*swpc*" -mmin 0.1 >> tmp/restart.txt #adds line to restart.txt so node application can restart
  date >> tmp/restart.txt
fi