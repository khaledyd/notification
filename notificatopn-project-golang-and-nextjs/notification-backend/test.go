package main

import (
	"fmt"
	"time"
)

func cusbo() {
	fmt.Println("welcome cusbo")
}
func main() {
	go cusbo()

	time.Sleep(1 * time.Second)
	fmt.Println("Hello, World!")
}
