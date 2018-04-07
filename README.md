#About

PathFinder scans all IP addresses on the internet to find those that provide content through HTTP/HTTPS protocool
under the specified path.

# Usage

    node app.js --path /wp-admin
    
The command above will send a request to all IPs v4 with the HTTP (ports 80, 8080, 9080) and HTTPS (ports 443, 9443)
protocol with the path `/wp-admin` resulting in building a report of all WordPress pages visible to the internet.