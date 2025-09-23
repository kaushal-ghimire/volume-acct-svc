FROM node:22.15-slim

# Install dependencies
RUN apt-get update && apt-get install -y libaio1 wget unzip && rm -rf /var/lib/apt/lists/*

# Download and unzip Oracle Instant Client
RUN mkdir -p /opt/oracle && cd /opt/oracle \
    && wget https://download.oracle.com/otn_software/linux/instantclient/2390000/instantclient-basic-linux.x64-23.9.0.25.07.zip \
    && unzip instantclient-basic-linux.x64-23.9.0.25.07.zip \
    && rm instantclient-basic-linux.x64-23.9.0.25.07.zip

# Make sure the folder is correct
RUN ls -l /opt/oracle  # confirm the folder name (usually instantclient_23_9)

# Configure ldconfig
RUN sh -c "echo /opt/oracle/instantclient_23_9 > /etc/ld.so.conf.d/oracle-instantclient.conf" \
    && ldconfig

# Set environment variables
ENV OCI_LIB_DIR=/opt/oracle/instantclient_23_9
ENV OCI_INC_DIR=/opt/oracle/instantclient_23_9/sdk/include
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_23_9
ENV NODE_ORACLEDB_THICK_MODE=true
ENV TZ=Asia/Kathmandu
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
