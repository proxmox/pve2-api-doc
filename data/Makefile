PREFIX=/usr
DOCDIR=${PREFIX}/share/pve2-api-doc/
MANPAGES=pvecm.1.html qm.1.html datacenter.cfg.5.html vm.conf.5.html
PVECLUSTERPODDIR=/usr/share/doc/pve-cluster/pod
QEMUSERVERPODDIR=/usr/share/doc/qemu-server/pod

all: ${MANPAGES} apidoc.js

apidata.js: extractapi.pl
	./extractapi.pl >$@

JSSRC= apidata.js PVEAPI.js

apidoc.js: ${JSSRC}
	cat ${JSSRC} >$@

pvecm.1.html: ${PVECLUSTERPODDIR}/pvecm.1.pod
	cat $<|pod2html --noindex > $@

datacenter.cfg.5.html: ${PVECLUSTERPODDIR}/datacenter.cfg.5.pod
	cat $<|pod2html --noindex > $@

qm.1.html: ${QEMUSERVERPODDIR}/qm.1.pod
	cat $<|pod2html --noindex > $@

vm.conf.5.html: ${QEMUSERVERPODDIR}/vm.conf.5.pod
	cat $<|pod2html --noindex > $@

.PHONY: install
install: apidoc.js apidoc.html apidata.js ${MANPAGES}
	install -d -m 0755 ${DESTDIR}${DOCDIR}
	install -D -m 0644 apidoc.html ${DESTDIR}${DOCDIR}/index.html;
	install -D -m 0644 apidoc.js ${DESTDIR}${DOCDIR}/apidoc.js;
	install -D -m 0644 apidata.js ${DESTDIR}${DOCDIR}/apidata.js;
	install -D -m 0644 pve-man-include.php ${DESTDIR}/etc/mediawiki-extensions/extensions-available/pve-man-include.php;
	install -d -m 0755 ${DESTDIR}${DOCDIR}/man
	install -m 0644 ${MANPAGES} ${DESTDIR}${DOCDIR}/man

#pvelib_DATA = apidoc.js apidoc.html
#pvelibdir = ${WWW_ROOTDIR}

clean:
	-rm -rf *~ apidata.js apidoc.js ${MANPAGES}


