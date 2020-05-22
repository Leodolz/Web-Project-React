#El de aqui abajo funciona casi completamente bien 
#FROM microsoft/aspnet
#SHELL ["powershell"]
#WORKDIR /app
#COPY ./bin/Release/Publish/ /inetpub/wwwroot
#EXPOSE 63466
#RUN $newCert=New-SelfSignedCertificate -DnsName 'localhost' -CertStoreLocation cert:\LocalMachine\My; \
#  New-WebBinding -Name 'Default Web Site' -Protocol 'https'; \
#  $binding=Get-WebBinding -Name 'Default Web Site' -Protocol 'https'; \
#  $binding.AddSslCertificate($newCert.GetCertHashString(),'my')
