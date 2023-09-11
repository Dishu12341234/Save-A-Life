all:
	git add .
	git commit -m 'all' | lolcat
	git push
	git stash
	clear