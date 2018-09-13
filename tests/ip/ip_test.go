package ip

import "testing"
import "../../ip"

func TestNewIpWithZeros(t *testing.T) {
	newIp, err := ip.NewIp("0.0.0.0")
	if err != nil {
		t.Error("The ip 0.0.0.0 is legit and should not generate any errors")
	}
	if newIp.ToString() != "0.0.0.0" {
		t.Error("The ip 0.0.0.0 was not parsed properly")
	}
}

func TestNewIpMax(t *testing.T) {
	newIp, err := ip.NewIp("255.255.255.255")
	if err != nil {
		t.Error("The ip 255.255.255.255 is legit and should not generate any errors")
	}
	if newIp.ToString() != "255.255.255.255" {
		t.Errorf("The ip 255.255.255.255 was not parsed properly. The serialized value was %s", newIp.ToString())
	}
}

func TestIncrementFirstPart(t *testing.T) {
	newIp, _ := ip.NewIp("0.0.0.100")
	newIp = newIp.Increment()
	if newIp.ToString() != "0.0.0.101" {
		t.Errorf("After incrementing the IP 0.0.0.100, the expected one was 0.0.0.101, but the actual was %s", newIp.ToString())
	}
}

func TestIncrementSecondPart(t *testing.T) {
	newIp, _ := ip.NewIp("0.0.0.255")
	newIp = newIp.Increment()
	if newIp.ToString() != "0.0.1.0" {
		t.Errorf("After incrementing the IP 0.0.0.255, the expected one was 0.0.1.0, but the actual was %s", newIp.ToString())
	}
}

func TestIncrementThirdPart(t *testing.T) {
	newIp, _ := ip.NewIp("0.0.255.255")
	newIp = newIp.Increment()
	if newIp.ToString() != "0.1.0.0" {
		t.Errorf("After incrementing the IP 0.0.255.255, the expected one was 0.1.0.0, but the actual was %s", newIp.ToString())
	}
}

func TestIncrementFourthPart(t *testing.T) {
	newIp, _ := ip.NewIp("0.255.255.255")
	newIp = newIp.Increment()
	if newIp.ToString() != "1.0.0.0" {
		t.Errorf("After incrementing the IP 0.255.255.255, the expected one was 1.0.0.0, but the actual was %s", newIp.ToString())
	}
}

func TestHasMoreWhenItDoes(t *testing.T) {
	newIp, _ := ip.NewIp("255.255.255.254")
	if !newIp.HasMore() {
		t.Errorf("The IP 255.255.255.254 has one more value")
	}
}

func TestHasMoreWhenItDoesNot(t *testing.T) {
	newIp, _ := ip.NewIp("255.255.255.255")
	if newIp.HasMore() {
		t.Errorf("The IP 255.255.255.255 has no more values")
	}
}
