/** Import package */
import axios from "axios";
/** Import global */
import helpers from "./helpers";

class Rest {
  constructor(_url) {
    this._url = _url ?? "http://127.0.0.1:8000/api/";
    this.isRefreshing = false;
    this.failedRequests = [];
    this._XTOKEN = "_xa"; // used to be X-Token
    this._tokenValue = sessionStorage.getItem(this._XTOKEN);

    this.http = axios.create({
      baseURL: this._url,
      withCredentials: true
    });

    // Response interceptors for API calls
    this.http.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          (error.response &&
            error.response.status === 401 &&
            !originalRequest._retry) ||
          error.message === "Network Error"
        ) {
          if (this.isRefreshing) {
            sessionStorage.removeItem("_xa");
            sessionStorage.removeItem("_us");
            sessionStorage.removeItem("_rl");
            window.location.reload();
            // try {
            //   const token = await new Promise((resolve, reject) => {
            //     this.failedRequests.push({ resolve, reject });
            //   });
            //   originalRequest.headers.Authorization = `Bearer ${token}`;
            //   return this.http(originalRequest);
            // } catch (e) {
            //   sessionStorage.removeItem("_xa");
            //   sessionStorage.removeItem("_us");
            //   sessionStorage.removeItem("_rl");
            //   window.location.reload();
            //   return e;
            // }
          }

          // Set the flag to indicate that refreshing is in progress
          this.isRefreshing = true;

          // Refresh the token using your authentication logic
          return await this._refreshToken()
            .then((newToken) => {
              // Update the original request with the new token
              originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
    
              // Resolve all the enqueued requests
              refreshSubscribers.forEach((callback) => callback(newToken));
              refreshSubscribers = [];
    
              return this.http(originalRequest);
            })
            .catch((refreshError) => {
              console.log('this');
              // Handle token refresh error
              console.error('Token refresh failed:', refreshError);
              // You might want to redirect the user to the login page or handle the error appropriately
              sessionStorage.removeItem("_xa");
              sessionStorage.removeItem("_us");
              sessionStorage.removeItem("_rl");
              window.location.reload();
    
              return Promise.reject(refreshError);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
        return Promise.reject(error);
      }
    );
  }


  async _refreshToken() {
    try {
      const response = await this.http.get('auth/refresh');
      // Assume the new token is returned in the response data
      const newToken = response.data.authorisation.token;

      // Update the current user's token in your authentication system (if applicable)
      if (sessionStorage.getItem('_xa')) {
        sessionStorage.setItem('_xa', newToken);
      }
      return await Promise.resolve(newToken);
    } catch (refreshError) {
      // Handle token refresh error
      console.error('Token refresh failed:', refreshError);
      return await Promise.reject(refreshError);
    }
  }

  // Helper method: add additional key-value to an object
  _add2Object(key, value, obj) {
    if (!obj) obj = {};
    obj[key] = value;
    return obj;
  }

  // Helper method: create config or header object
  _headerAsConfig(headers, onlyHeader) {
    if (!headers) headers = {};

    const x = this._tokenValue || sessionStorage.getItem(this._XTOKEN);
    if (x) {
      // let dec = helpers.dec(x, 1, 6);
      // const auth = JSON.parse(helpers.dec(x, 1, 6));
      // headers["Authorization"] = `Bearer ${auth.Token}`;
      headers["Authorization"] = `Bearer ${x}`;
    }

    return onlyHeader ? headers : { headers: headers };
  }

  Api() {
    return {
      get: async (_url, hdrs) =>
        await this.http.get(
          _url,
          this._headerAsConfig(
            this._add2Object("Content-Type", "application/json", hdrs)
          )
        ),

      post: async (_url, object, hdrs) =>
        await this.http.post(
          _url,
          object,
          this._headerAsConfig(
            this._add2Object("Content-Type", "application/json", hdrs)
          )
        ),

      put: async (_url, object, hdrs) =>
        await this.http.put(
          _url,
          object,
          this._headerAsConfig(
            this._add2Object("Content-Type", "application/json", hdrs)
          )
        ),

      bin: async (_url, hdrs) =>
        await this.http.get(
          _url,
          this._add2Object(
            "responseType",
            "arraybuffer",
            this._headerAsConfig(hdrs)
          )
        ),

      del: async (_url, hdrs) =>
        await this.http.delete(
          _url,
          this._headerAsConfig(
            this._add2Object("Content-Type", "application/json", hdrs)
          )
        ),

      upload: async (_url, filepath, fdName = "") => {
        const fd = new FormData();
        fd.append(fdName, filepath);
        return await this.http.post(
          _url,
          fd,
          this._add2Object(
            "Content-Type",
            "multipart/form-data",
            this._headerAsConfig()
          )
        );
      },

      file: async (url) => this.http.get(url, this._headerAsConfig()),

      downloadFile: async (_url, object, hdrs) => {
        try {
          const response = await this.http.post(
            _url,
            object,
            this._add2Object("responseType", "blob", this._headerAsConfig(hdrs)) // Specify that the response should be treated as a binary blob
          );

          let filename = setDefaultFileName();
          // Extract the filename from the Content-Disposition header
          const contentDisposition =
            response.headers["content-disposition"] ||
            response.headers["Content-Disposition"];
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);

          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }

          // Create a temporary URL for the Blob
          const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel",
          });
          const url = window.URL.createObjectURL(blob);

          // Create a link element and set its properties for downloading
          const a = document.createElement("a");
          a.href = url;
          a.download = filename; // Use the extracted filename for the download

          // Append the link to the DOM and trigger the download
          document.body.appendChild(a);
          a.click();

          // Clean up the object URL after download
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error downloading Excel file:", error);
        }

        function setDefaultFileName() {
          // Get the current date and time
          const now = new Date();

          // Get just the date part (set the time component to midnight)
          const dateOnly = new Date(now);
          dateOnly.setHours(0, 0, 0, 0);

          // Convert the date to a string with a specific format (yyyy-MM-dd)
          const dateString = dateOnly.toISOString().split("T")[0];
          return `File_Download_${dateString}.xls`; // Default filename if not found in the header
        }
      },
    };
  }
}

export default Rest;