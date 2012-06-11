all: sortpref.xpi

sortpref.xpi:
	make -f Makefile.chrome -C chrome sortpref.jar
	rm -f $@
	zip $@ chrome/sortpref.jar install.rdf license.txt chrome.manifest

babelzilla:
	make -f Makefile.chrome -C chrome babelzilla
	rm -rf sortpref.xpi
	zip sortpref.xpi chrome/sortpref.jar install.rdf license.txt chrome.manifest

localize:
	rm -rf chrome/locale/*
	wget http://www.babelzilla.org/wts/download/locale/all/replaced/5280 -O chrome/locale/locales.tar.gz
	cd chrome/locale/; tar xzf locales.tar.gz
	rm -rf chrome/locale/locales.tar.gz

clean:
	rm -f chrome/sortpref.jar sortpref.xpi
