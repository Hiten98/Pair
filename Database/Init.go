package main

import (
	"fmt"
	"golang.org/x/net/context"

 	firebase "firebase.google.com/go"
 	google.golang.org/api/option"
	
	"golang.org/x/net/context"
)

func main() {
	opt := option.WithCredentialsFile("path/to/key.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	
	client, err := app.Auth()
	if err != nil {
	  return err
	}

	decoded, err := client.VerifyIDToken(idToken)
	uid := decoded.UID
		
}
