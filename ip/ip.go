package ip

import (
	"errors"
	"fmt"
	"math"
	"strconv"
	"strings"
)

const max_ip_value = 4294967295 // 256^4 - 1

type IP struct {
	value int
}

func (this *IP) HasMore() bool {
	return this.value < max_ip_value
}

func (this *IP) Increment() IP {
	return IP{this.value + 1}
}

func (this *IP) ToString() string {
	a := this.value / (256 * 256 * 256)
	b := (this.value - a*256*256*256) / (256 * 256)
	c := (this.value - (a * 256 * 256 * 256) - (b * 256 * 256)) / 256
	return fmt.Sprintf("%d.%d.%d.%d", a, b, c, this.value%256)
}

func (this *IP) Equals(addr *IP) bool {
	return this.value == addr.value
}

func NewIp(value string) (IP, error) {
	partsStr := strings.Split(value, ".")
	if len(partsStr) != 4 {
		return IP{0}, errors.New("Failed process the string. The value does not represent the IPv4")
	}
	sum := 0
	for i := range partsStr {
		part, _ := strconv.ParseInt(partsStr[i], 10, 32)
		sum += int(part * int64(math.Pow(float64(256), float64(3-i))))
	}
	return IP{sum}, nil
}
