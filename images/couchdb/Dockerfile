from couchdb:2.1

RUN chown -R couchdb:couchdb /opt/couchdb && \
    chmod -R 0770 /opt/couchdb/data && \
    chmod 664 /opt/couchdb/etc/*.ini  && \
    chmod 664 /opt/couchdb/etc/default.d/*.ini  && \
    chmod 775 /opt/couchdb/etc/*.d 