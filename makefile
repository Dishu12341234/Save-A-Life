all:
	git add .
	git commit -m 'all' | lolcat
	git push
	clear
	git -v | lolcat
	sleep 1
	clear
	NEOFETCH	