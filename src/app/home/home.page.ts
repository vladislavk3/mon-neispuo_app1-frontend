import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { OIDCService } from '../oidc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  lastLoadedAt: Date;
  unprotectedResource: string;
  protectedResource: string;
  protectedResourceWithForeignJwt: string;

  constructor(public oidcService: OIDCService, private httpClient: HttpClient) { }

  async demoGetResources() {
    const jwt = (await this.oidcService.userManager.getUser())?.id_token
    const authHeaders = `Bearer ${jwt}`
    const protectedUrl = `${environment.resourceServerUrl}/protected-resource`
    const unprotectedUrl = `${environment.resourceServerUrl}/unprotected-resource`
    await this.httpClient.get<{ message: string }>(protectedUrl, { headers: { authorization: authHeaders } })
      .toPromise()
      .then(v => this.protectedResource = v.message)
      .catch(v => this.protectedResource = null)
    await this.httpClient.get<{ message: string }>(unprotectedUrl, { headers: { authorization: authHeaders } })
      .toPromise()
      .then(v => this.unprotectedResource = v.message)
      .catch(v => this.unprotectedResource = null)

    /** A jwt signed with a diferent private key than OIDC's. For demo's negative case. */
    const foreignAuthHeaders = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiJhYWEiLCJhdF9oYXNoIjoiRHVQQVVuMkhLYXUtbWx3OHMxZllvdyIsImF1ZCI6ImFwcDEiLCJleHAiOjIwMDYxMjg0NzAsImlhdCI6MTYwNjEyNDg3MCwiaXNzIjoiaHR0cHM6Ly9kc3Mtb2lkYy1zZXJ2ZXIuemVub25jdWx0dXJhbC5jb20ifQ.eAGrZBjEyNdftF8LlekXYjscVTFAomd6ar1MCzQDuYN2evGCJVr2ANRJSMiw79Gz3ibQYJrrJVDL92OVGVt7iVpi5O0CkNwutio3S2vJJaN95HYjH5_3WX5Q6lA8WWkw86sqRJGEU2zvVxX-UZw9E33lRVQSx2qAOMdJIusNH-0`
    await this.httpClient.get<{ message: string }>(protectedUrl, { headers: { authorization: foreignAuthHeaders } })
      .toPromise()
      .then(v => this.protectedResourceWithForeignJwt = v.message)
      .catch(v => this.protectedResourceWithForeignJwt = null)

    this.lastLoadedAt = new Date()
  }

  async login(): Promise<void> {
    await this.oidcService.userManager.signinRedirect();
  }

  async logout() {
    await this.oidcService.userManager.signoutRedirect()
  }
}

/*
Keys used for demo foreignJwt: http://phpseclib.sourceforge.net/rsa/examples.html

-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0FPqri0cb2JZfXJ/DgYSF6vUp
wmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/3j+skZ6UtW+5u09lHNsj6tQ5
1s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQABAoGAFijko56+qGyN8M0RVyaRAXz++xTqHBLh
3tx4VgMtrQ+WEgCjhoTwo23KMBAuJGSYnRmoBZM3lMfTKevIkAidPExvYCdm5dYq3XToLkkLv5L2
pIIVOFMDG+KESnAFV7l2c+cnzRMW0+b6f8mR1CJzZuxVLL6Q02fvLi55/mbSYxECQQDeAw6fiIQX
GukBI4eMZZt4nscy2o12KyYner3VpoeE+Np2q+Z3pvAMd/aNzQ/W9WaI+NRfcxUJrmfPwIGm63il
AkEAxCL5HQb2bQr4ByorcMWm/hEP2MZzROV73yF41hPsRC9m66KrheO9HPTJuo3/9s5p+sqGxOlF
L0NDt4SkosjgGwJAFklyR1uZ/wPJjj611cdBcztlPdqoxssQGnh85BzCj/u3WqBpE2vjvyyvyI5k
X6zk7S0ljKtt2jny2+00VsBerQJBAJGC1Mg5Oydo5NwD6BiROrPxGo2bpTbu/fhrT8ebHkTz2epl
U9VQQSQzY1oZMVX8i1m5WUTLPz2yLJIBQVdXqhMCQBGoiuSoSjafUhV7i1cEGpb88h5NBYZzWXGZ
37sJ5QsW+sJyoNde3xH8vdXhzU7eT82D6X/scw9RZz+/6rCJ4p0=
-----END RSA PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0
FPqri0cb2JZfXJ/DgYSF6vUpwmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/
3j+skZ6UtW+5u09lHNsj6tQ51s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQAB
-----END PUBLIC KEY-----
*/