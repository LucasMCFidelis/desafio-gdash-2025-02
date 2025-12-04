package server

import (
    "net/http"
    "fmt"
)

func Start() {
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        fmt.Fprintf(w, "OK")
    })

    fmt.Println("Health server running on :10000")
    http.ListenAndServe(":10000", nil)
}
