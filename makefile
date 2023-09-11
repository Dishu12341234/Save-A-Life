all:
	git add .
	git commit -m 'all' | lolcat
	git push
	sleep 1
	clear
	echo 'git commit done'
	sleep 1
	clear