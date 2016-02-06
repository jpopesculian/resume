package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

var file_dir string
var port uint64

func main() {
	default_dir := "dist"
	default_port, err := strconv.ParseUint(os.Getenv("PORT"), 0, 16)
	if err != nil {
		default_port = 5000
	}
	flag.StringVar(&file_dir, "f", default_dir, "Path to static file directory")
	flag.Uint64Var(&port, "p", default_port, "Port to serve on")
	flag.Parse()

	http.Handle("/", http.FileServer(http.Dir(file_dir)))
	log.Println(fmt.Sprintf("Serving at localhost:%d...", port))
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
