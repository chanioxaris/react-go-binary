package main

import (
	"log"
	"net/http"
	"time"

	rice "github.com/GeertJohan/go.rice"
)

func main() {
	// Define the rice box with the frontend client static files.
	appBox, err := rice.FindBox("client/build")
	if err != nil {
		log.Fatal(err)
	}

	// Define ping endpoint that responds with pong.
	http.HandleFunc("/api/ping", pingHandler())
	// Serve static files
	http.Handle("/static/", http.FileServer(appBox.HTTPBox()))
	// Serve SPA (Single Page Application)
	http.HandleFunc("/", serveAppHandler(appBox))

	log.Println("Server starting at port 8080...")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}

func pingHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Pong"))
	}
}

func serveAppHandler(app *rice.Box) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		indexFile, err := app.Open("index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		http.ServeContent(w, r, "index.html", time.Time{}, indexFile)
	}
}
