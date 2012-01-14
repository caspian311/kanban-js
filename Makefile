
all: clean tests cukes

clean:
	rm -fR reports

tests:
	mocha --reporter spec test/*Test.js

cukes:
	mkdir reports
	cucumber

