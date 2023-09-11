all:
	git add .
	git commit -m 'all' | lolcat
	git push
	git -v | lolcat
	sleep 1
	clear