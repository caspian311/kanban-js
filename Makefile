clean:
	rm -fR reports

tests:
	mocha --reporter spec test/*test.js

cukes:
	mkdir resports
	cucumber

all: clean tests cukes
