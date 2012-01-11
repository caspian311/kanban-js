
all: clean tests cukes

clean:
	rm -fR reports

tests:
	mocha --reporter spec test/*test.js

cukes:
	mkdir reports
	cucumber

