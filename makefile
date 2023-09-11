all:
	git add . | lolcat
	git commit -m 'all' | lolcat
	git push | lolcat
	sleep 1
	clear
	echo 'git commit done'