package ip

import (
	"io/ioutil"
	"net/http"
	"regexp"
	"time"
)

type ipValidator struct {
	httpClient http.Client
	path       string
	exp        *regexp.Regexp
}

func (this *ipValidator) validateUrl(url string) bool {
	response, err := this.httpClient.Get(url)
	if err != nil {
		return false
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return false
	}

	bodyBytes, _ := ioutil.ReadAll(response.Body)

	result := this.exp.Match(bodyBytes)

	return result
}

func (this *ipValidator) ValidateIp(addr IP) bool {
	httpResult := this.validateUrl("http://" + addr.ToString() + this.path)
	httpsResult := this.validateUrl("https://" + addr.ToString() + this.path)

	return httpResult || httpsResult
}

func NewIpValidadtor(path string, exp *regexp.Regexp) ipValidator {
	httpClient := http.Client{
		Timeout: time.Second * 2,
	}
	return ipValidator{httpClient, path, exp}
}
