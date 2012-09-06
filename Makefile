
MOCHA:=	./node_modules/.bin/mocha
ifeq ($(wildcard $(MOCHA)),)
   MOCHA:=	mocha
endif

all: clean test cukes cukes_wip

clean:
	rm -fR reports
	mkdir reports

tests:
	$(MOCHA) --reporter spec test/**/*Test.js

cukes:
	cucumber

cukes_wip:
	cucumber -p wip

