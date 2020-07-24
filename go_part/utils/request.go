package utils

import (
	"net/http"
)

// HTTPGet get request
func HTTPGet(url string, query map[string]string) (*http.Response, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	urlQuery := req.URL.Query()
	for k, v := range query {
		urlQuery.Add(k, v)
	}
	req.URL.RawQuery = urlQuery.Encode()

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}

	return res, nil
}
