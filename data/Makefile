PREFIX=/usr
DOCDIR=${PREFIX}/share/pve2-api-doc/

MAN1PAGES=$(subst .pm,.1.html,$(subst _,-,$(shell cd /usr/share/perl5/PVE/CLI; ls *.pm)))

# we currently do not generate manpages for service
#MAN8PAGES=$(subst .pm,.8.html,$(subst _,-,$(shell cd /usr/share/perl5/PVE/Service; ls *.pm)))

MANPAGES=			\
	${MAN1PAGES}		\
	dab.1.html		\
	pve-firewall.8.html	\
	datacenter.cfg.5.html 	\
	vm.conf.5.html 		\
	pct.conf.5.html

PVECLUSTERPODDIR=/usr/share/doc/pve-cluster/pod
PVEMANAGERPODDIR=/usr/share/doc/pve-manager/pod
QEMUSERVERPODDIR=/usr/share/doc/qemu-server/pod
PVECONTAINERPODDIR=/usr/share/doc/pve-container/pod
PVESTORAGEPODDIR=/usr/share/doc/libpve-storage-perl/pod
PVEACCESSPODDIR=/usr/share/doc/libpve-access-control/pod
PVEFIREWALLPODDIR=/usr/share/doc/pve-firewall/pod
PVEHAMANAGERPODDIR=/usr/share/doc/pve-ha-manager/pod
DABPODDIR=/usr/share/doc/dab/pod

all: ${MANPAGES} apidoc.js

apidata.js: extractapi.pl
	./extractapi.pl >$@

JSSRC= apidata.js PVEAPI.js

apidoc.js: ${JSSRC}
	cat ${JSSRC} >$@

dab.1.html: ${DABPODDIR}/dab.1.pod
	cat $<|pod2html --noindex > $@

pvecm.1.html: ${PVECLUSTERPODDIR}/pvecm.1.pod
	cat $<|pod2html --noindex > $@

pveum.1.html: ${PVEACCESSPODDIR}/pveum.1.pod
	cat $<|pod2html --noindex > $@

datacenter.cfg.5.html: ${PVECLUSTERPODDIR}/datacenter.cfg.5.pod
	cat $<|pod2html --noindex > $@

qm.1.html: ${QEMUSERVERPODDIR}/qm.1.pod
	cat $<|pod2html --noindex > $@

qmrestore.1.html: ${QEMUSERVERPODDIR}/qmrestore.1.pod
	cat $<|pod2html --noindex > $@

pct.1.html: ${PVECONTAINERPODDIR}/pct.1.pod.gz
	zcat $<|pod2html --noindex > $@

pct.conf.5.html: ${PVECONTAINERPODDIR}/pct.conf.5.pod.gz
	zcat $<|pod2html --noindex > $@

pve-firewall.8.html: ${PVEFIREWALLPODDIR}/pve-firewall.8.pod
	cat $<|pod2html --noindex > $@

#pve-ha-lrm.1.html: ${PVEHAMANAGERPODDIR}/pve-ha-lrm.1.pod
#	cat $<|pod2html --noindex > $@

#pve-ha-crm.1.html: ${PVEHAMANAGERPODDIR}/pve-ha-crm.1.pod
#	cat $<|pod2html --noindex > $@

ha-manager.1.html: ${PVEHAMANAGERPODDIR}/ha-manager.1.pod.gz	
	zcat $<|pod2html --noindex > $@

pvesm.1.html: ${PVESTORAGEPODDIR}/pvesm.1.pod
	cat $<|pod2html --noindex > $@

vm.conf.5.html: ${QEMUSERVERPODDIR}/vm.conf.5.pod
	cat $<|pod2html --noindex > $@

vzdump.1.html: ${PVEMANAGERPODDIR}/vzdump.1.pod
	cat $<|pod2html --noindex > $@

pveceph.1.html: ${PVEMANAGERPODDIR}/pveceph.1.pod
	cat $<|pod2html --noindex > $@

pvesubscription.1.html: ${PVEMANAGERPODDIR}/pvesubscription.1.pod
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


