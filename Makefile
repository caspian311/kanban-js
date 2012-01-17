
all: clean tests cukes cukes_wip

clean:
	rm -fR reports
	mkdir reports

tests:
	mocha --reporter spec test/*Test.js

cukes:
	cucumber

cukes_wip:
	cucumber -p wip

