.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Usage: make commit MESSAGE='Your commit message'"
	@echo "  commit        : Add, commit, and push changes to the repository"

.PHONY: commit
commit:
ifndef MESSAGE
	$(error MESSAGE is not defined. Please use: make commit MESSAGE='Your commit message')
else
	git add .
	git commit -m "$(MESSAGE)"
	git push origin master
endif