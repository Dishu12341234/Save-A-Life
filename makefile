all:
	git add .
	git commit -m 'all' | lolcat
	git push
	git -v
	sleep 1
	clear