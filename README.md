# DEPRECIATION NOTICE

**As it's easy to notice, the standalone application like this one, can take longer than a lifetime to scan all IPs.
For this reason this project is now deprecated in favor of [pathFinderLambda](https://github.com/kamiljano/pathFinderLambda)
which can scale to numbers where the result can be acquired much faster.**

# About

PathFinder scans all IP addresses on the internet to find those that provide content through HTTP/HTTPS protocol
under the specified path. Useful if you want to find all git repositories that were accidentally uploaded
to HTTP servers

# Debugging

    go run main.go "/.git/HEAD" "refs/heads/master"