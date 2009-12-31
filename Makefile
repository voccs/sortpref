all: sortpref.xpi

sortpref.xpi:
	make -f Makefile.chrome -C chrome sortpref.jar
	rm -f $@
	zip $@ chrome/sortpref.jar install.rdf license.txt chrome.manifest

clean:
	rm -f chrome/sortpref.jar sortpref.xpi
