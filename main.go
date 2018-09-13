package main

import (
	"./ip"
	"fmt"
	"github.com/Jeffail/tunny"
	"os"
	"regexp"
	"runtime"
)

func createThreadPool(path string, exp *regexp.Regexp, finalIp ip.IP) (*tunny.Pool, chan bool) {
	validator := ip.NewIpValidadtor(path, exp)
	numCPUs := runtime.NumCPU()
	completeChannel := make(chan bool)

	pool := tunny.NewFunc(numCPUs, func(payload interface{}) interface{} {
		addr := payload.(ip.IP)
		if validator.ValidateIp(addr) {
			fmt.Printf("Match: %s\r\n", addr.ToString())
		}

		if finalIp.Equals(&addr) {
			completeChannel <- true
		}

		return addr
	})

	pool.SetSize(1000)
	return pool, completeChannel
}

func main() {
	args := os.Args[1:]
	fmt.Printf("path: %s regex: %s", args[0], args[1])

	regex, regexpError := regexp.Compile(args[1])
	if regexpError != nil {
		fmt.Println("The provided regexp is not valid")
		return
	}

	currentIp, _ := ip.NewIp("0.0.0.0")
	finalIp, _ := ip.NewIp("255.255.255.255")
	pool, completeChannel := createThreadPool(args[0], regex, finalIp)
	defer pool.Close()

	i := 0
	for currentIp.HasMore() {
		pool.Process(currentIp)
		if i%100000 == 0 {
			fmt.Printf("Checkpoint: %s\r\n", currentIp.ToString())
		}
		i++
		currentIp = currentIp.Increment()
	}

	<-completeChannel
}
