.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Usage: make commit MESSAGE='Your commit message'"
	@echo "  commit        : Add, commit, and push changes to the repository"

.PHONY: commit
commit:
ifndef m
	$(error MESSAGE is not defined. Please use: make commit MESSAGE='Your commit message')
else
	git add .
	git commit -m "$(m)"
	git push origin master
endif