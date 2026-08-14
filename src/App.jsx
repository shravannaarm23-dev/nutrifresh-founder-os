import { useState, useEffect, useRef } from "react";

const LOGO_B64 = "iVBORw0KGgoAAAANSUhEUgAAAQYAAABICAYAAAAUEFuUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAB+/SURBVHhe7Z15eBzVlbffqq7urt5b+25LsiUvWPK+YBswxpgYggPYQAhrJnzJJIRhHobMZJkkzJeQhYQkZPIFsk0WBnBITGwcb4nxirG8yLItL7Isy9qs1dpa6r276vuj5ba6JdkWGJCUep+n/qh7T1dXd1f96txzzr0tqKqqoqGhodEPMb5BQ0NDQxMGDQ2NAWjCoKGhMQBNGDQ0NAagCYOGhsYANGHQ0NAYgCYMGhoaA9CEQUNDYwCaMGhoaAxAEwYNDY0BaMKgoaExAE0YNDQ0BqAJg4aGxgA0YdDQ0BiAJgwaGhoD0IRBQ0NjAJowaGhoDEAYDSs4PbfWgKIGERAw6p1YTZnkpixhYsYKkm1Tscrp6HWm+Je9LwKhXnp8TTR1HqKqeQuNHfvp8TYRCLkAyEycy4OLtyIbEuJfqqEx6hkVwvCtPwvxTYCAXmci0VrIhPSPUTT+QVJsUxGE9+cEhZUAzV1lHK39A+datuHy1hEK++LNSLQW8k9L38VkSIrv0tAY9YwKYfj2Wh2qqsQ390MkwTqBxZO/ytTsezFIlniDq8If7OZA1X9z6OzP6fU1xXfHkO6cxUM3bsOkeQwaY5D393j9kLAa0+Ob4lDo7D3D1iNPse3YM3S5a+MNLouqKrR2l/PWoc+wt+K7VxQFAIsxBVHQxTdraIwJRoUwpDqL45sGJRBycfjcL9l85Am63NXAlZ0hVVVp6jzEugMPU3F+LcGwJ95kUBJthYiiPr5ZQ2NMMCqEITdlKTBYnGEgqqpwtmkz6w8+RlPn4fjuGFRV4Vzb2/y19LO0uo7Hdw+JKEikO2chicb4Lg2NMcGoEIbspOuHFTdQUahv38vOk8/i78siDEa3t56/H3malu6jqGo4vntILHIa6c7p7zvQqaExUhkVV7bTnEuSbXJ882VRVYXq5q3sOvHsoFkFX6CLbceeoW0YngKAgECaYzpJtinxXRoaY4ZRIQxmYzIT0pZf9XDiIooa5PC5X1HVvDmmPawEKav5Hyob30K9ijhEf3Q6mUmZd6HXyfFdGu8BVQ3jD/bgC3QOKuAaHw2jIl0J0Nx1hLUl99PRWxnfdUXy05Zz/8L1SH03c3vPadaWfJKW7qNXFaDsT6qjmE8t3oTNlBXfpdEPf9BDTfMBTtfvIBjys3zuM9hMyQAoapgLrpNUNm2gpnUnvf4WVDWESZ/I0qLvMi55cfzhRhw9viaO1fyBQLgHAFHQMS3nQZJshfGmo5JR4TEApDmKmF/wFHqdOb7rijR2HKCubXd0v+7Cnj6BGZ4oyPoElhU9j82UGd+l0Y+u3kb+tPNpfrHhPjbu+xZHz64jFPJG++vadvHm/k+x88TXOdf6d9q6j3HBdZLmrsN4A+0xxxqpuL3N7D/zIu+ceo53Tj3H3orv0dFbFW82ahk1wiAIOorHP8LUnPuHHfTzBbs5Vve/BENuFDVIZdNfrzoteRGDZOP6wmeYkH7bsIc0IxUVFVVVYrb3SyjkZ+O+b/HO8d/Q621DRSXZMQFLn7fg9rfw19LP0eY6PuD9BEFEr7v6ILPGB8fw7rCPGINkZcnU/0tBxp0IwyouUqlp206Xp5ZebzO1rTviDS6LIOgoGvcgs/L/T3zXqOZc0wH+suer0W3rwR/g8rTGmw2Lqsa9lFWtQ1FCAJiMDlbM+woGKTKX5VTDm3S6z0btBUTSnbNYUPg0s/M/r3ljI4RRJQwAdnM2d8x6mYnptw9LHHq852nvOc2Jhjcum8KMR68zUTTuIZYV/xCzMSW+e1RT31rGloPfj267jr6E2/veXfmwEuRkzd9xeVoQBB1OSxarb/oBE7MW9VlEisn6D+FspizuWfAatxa/wLLi50mxT432aXx0jDphALDK6dw6/QVm5/8zsiExvntIWrrLqTj/ZnzzEAhY5QwWTf4Ky6e/MKw6in9UwkqIkBIgP2M+i6Z9moeX/5IFUx5CECJDL0UNEwxfijXQJwxWY0ZMm8ZHz6gUBoAkawG3zfgJy4qex2SIjF+vRFPnwavOajgtudw55zcsnPRlbQblZfAHPbR1naXH24ZeJ3PHgq/x5N0beXDZSxTl346+bwgxFDqdMSocV4OqKnR763B56y9blOYNdNDRe4YOdxVuXytXm3xTVQWPv42O3io63Gdw+1uGndIm+v5VdLrPEgi547tHPKMmXTkUqhqmqbOM/VUvUtO6HY+/FUWNjG/jsZmy8QYuDJkvF0U9DvM48lJvZUHBUyTZJl3TQOOWg89T03QQAElnYOXCZzHoLdS1HKampZR21zmUcIhE+zjGpc9mfOpsEu05AyZruX0dvP72kzR3VAAgCAK3zn6aeVMeiDnfU7XbWLv7P6L7yY58PnP7K+w88nP2n3qVXu8FOnrqov2SzkCKcyJ6nYwgiCya9mmWzPgC3399EcFQ5DsTBJF5Ux6kOP92dh15mdIza3F7L7B05pOsmP8Vfr/1cS50V0ePOatwNUtnPcHfjjxFS/cxuj01eAMd0X6DZCPBMgFREDHqndw17xXOtvyNQ1X/HbVxWvJYOfd3HKv9A4erf0Wn+ywZCXNYvWANZmMq9N3QLm8DlU0bONXwZ9pcJwkEe0AAvc5Msm0Kk7PuZlLWJ3Ca82IC2Coqbl8zx+v+SEXjWi64KgiG3aCCJJmwm7KZkHYbk7NXkeGcgU400txZxmvv3IHbH5lwpxMN3DN/DZLOxJFzv6Huwh78oR5AwCanMznrHmbmfYZEa8Gwg+cfBaNeGC4SDHto6jzMqYY/U9Wyha7eahQ1GGMjIPapf+xHlnQmkm2TKci4g8lZq0ixT0UnGmJsrgU/X383R6rWASDpjCyZ8QQ1zQdoaDuKP+iJPgEFQUTSyWQmTeXW2U8zq3AVku7S+bg8Lfx07QrqWsv67AXuvelHLJv9VIwwlFb+iV9suC+6n5E0la8+dJD17/wn20p/HG0fDEEQWTHvK9y1+Nt88UULgVAkiyMIIrMKVuP1d3G6fgdhJfId37nwWZbOfJLvv76Y5o5T0ePcNP3z3HPjt1mz904a2t+Ntg+GyZDE47cc4kT9H9l+/MvR9kTrRKZmf5IDVT8hEOoFICdpEfcuXIvFmIaqKtRc2Mm2o8/Q5jpJWPH3O+oldKKeFEcxy4t/zPiUG6Lt3Z46NpZ+jpq2HUO+VhB0WIxpLC16juJxj9DSdTRGGERBz6TMuzjX+jb+YOcAL0MQdExIu42Pz/7VqAiwjnzpukr0OjPjkhdzS9H3+OTC9axa8EdumvpfFI9/jIKMO8lNWcL4lJsYn3IjuSm3UJh5FzPzHmdp0fe49/q13LvwTW6Y8g3SnTM+EFGIJxQOsKPsZ1SdfwdfoCfGLVZVhWDIQ21LKa+9/QQbS57DHxwh7qiqcrL2b5yu3x4VhQ8al6eB/Wd+FBUFAL1kRhQkAFq6j7Lt6DM0d5VFb2wBAYNk7Ut/RsQyrARp7jzMtvIv0d5zuu9IKqcb11MbJwqioEfSmaJPd1UN0+trouL8OsJxDxwARQ1xunEdvmDHAFGg7/U1bTs51/p2fNeIZMwIw0UknUySbRKTs+7ihin/ycdnv8w981/jvoXruG/hX7hv4XruW/gm98z7X1bM/H8sLPwSE9M/htOci+5DnUatElYC0T1BENGJBnSiHiH61Ffx+DvZXvYi7574Hco1qDMQAINkwSInYdTHBlQFQYfJ6MQiJ2GVkzDoBxaTqah4/V2ElRACAqKoRxQlZIM93rQfAkbJjsmQhC5uRqoo6JH1iZgMSZgMiYO62SHFF607EQQJUdT3HUckEHJz4MyLtHQfi9rrdWbmTnyS+xe+xf2L1jN34hf71UdEMiP7z7xIMOxBUcOcby8h1E8UUh3F3Dnn19y74M9cX/glZEMiks7E5KxVLCt6HmnQB4eKoobQiTIp9mmMT1nSVx17yYMLhT2U170a86qRysBfYQSiqCEUZegtvlAmgtB3sxkxSFaMegcGvR2jZMOot6GXLOhEQ9+FeO3iCMNFFCWykotZPvsZHl7+Sx5Y+jMWXPcIVjklel5efzdbD/6Q+tayAcOg4SOwfO6/8fWHy7h9/tdiepzWDD6/ci1ff7iMrz1cys0znojp74/NnMr11z3KfUte4L6bfsyk7CXxJlEMkpVPzP0dj99ysK9A7BIZibP59NK9fHZZGY/ctGPIUnNR0JOXuoybr/s2t01/kem5n0bSmWhzneDU+bVRj8so2VlW/DzLip8nN/Vm8lJv4bbpP2Hx5K9Gq2ZVNUxV82ZcngbCSghvsDPmvSakLWdS5ieYkLGCpdO+w6r5r7Os+AesnPvbvpLnwa8Xg2Rl6bTv8MhN23noxm3ce/1aUh1FMTb1VxhOjRRGhTDsr3yRPRXPDblVNW8eVBxUVcETuEBjxwFO1K2h9OxL7D/zIqXVv+T0+b/Q0nUMf7A7/mUfKvkZ1/Pw8l+wctGzLLzuEW4ofpz7b/4JD936MsmOvKhdZ08dByrWEApf8jLeK2ajk0R7DmY5dlk6UdDhsGSQaM8h0ZaDyeiI6b+IXjJxy6ynuHfJCyyZ8QWWzPw8OanT482iCIKIRU7Dbs4ZUNmoE43YTVnYzTnYTFkDAq0RBLKTFnL7rJ/3FUJ9jsmZn0CvkznXui1miGE1ZZJiv44210mau8po7iqjpfsoibaCmNS2J9BGp7sanSBhNiTF3Own6t9gW/mXOVbze1q6j5GZMI9ZeZ/FKFmjNoNRmPlx5kz4POa+1b0ynLOZlHlXTL1NMBSZWzHSGRXCsK/yB+w++eyQ25nmjShqOOqee/xtnG3eyroDD/PS1uv4zfb5vHngATaXPcHfjz3NpsP/zBv77uFXb8/iF3+fwdYj/0pjx0H8we4hMxofBHpJ5oFbfkp+xoK+tF7EyzEbncwqvJubZ3wxOrxRVYWKum14/F3xh/nQSU+cxOJp/4RFTkQUdIiCbtAhwLVCJxq4+bpvk2gtiAy1BDF6s7V0l8fYtvdU8IddN/OrbbNitrUl99HjbYjaKUqQXl8ToqhjfMqNMauMu7x1HK5+mbcOfZpfvz2HX709mz2nvkWnu3rI60NAYFLGXdGJevR5gymOKaNyQZ8P7tf8kAmEXFS3vM328q/y6p7beGPf3Ryvfw2Pf+gSX1UN0+2p4UDVT3l1z238ad9qDp19mU53zVXnvd8Pi6Z9huyUoZ60AlNzl+O0XnKtXe4Wer0XYqwuMfB8FWXoPP97RyDZno/NnBbf8YFh0FnISpoX3wxA4D16fCpqX7BRYFLm3cyZ8AWscla/+E6fnRqmy13NOxXf4dU9t3Gi/o+DeqeiqEc/SBGcIEgwjDqNkcKYEIaO3iq2HPkX3tz/SUrOvEBzVxmhuAq7y6PiC3ZyrnUb2479G2tL7qWyacMHHnWfVXDPgAuxP0mO8STZx0f3vYFu/IFLbvNFVBUCIW+MNChqGLc/dux8LRAAs+wcVlHS+0XUGYcMDBv1zph9g2Qj3TmTdOesK242OZI2NBuTWVr0Xe6e/woz8h4n0VqIXmfpy3pEPqeqhunsrWLniW8QGHI48OF9Jx80Y0IYalu3c6J+zTWZshtWAjR1HuKvpY+z68Q3cfta4k2uGYNF/ftj1Fuwmi8FIcPhYL9sQCRVF0GlpaMStZ+H4A+6OXt+eIEuRVX6hmSjh3THjJh9q5zOXXNf4dElu3js5t3R7dElu3hg8V9ZtWANjy7ZxSM3vc3EjNujrxMEHSn2aSyf/hMeW7Kbx27ewx2zf0luys0xN3yX+xxtrkt1GmOVMSEMihoe1L17P3j8bbxb+X22Hv3XD0QcJJ0xmocfCgEBs8ERvSzDShBFCSKKEmY5do7I0eq3OFm7DY+/G7evk7LKNymv3hhjE098Rsbnd9F44TihcIBA0IsvONSTceSQn7Ecg2SL7nf2nmXHyW/g8jSgEw3odRZ0gowncIHdJ7/Fn/atoqF9H5Join7/gVAPZed+zau7b+Nc69+QDYmkO2cyI/cxFk7697h5MiqeQFu//bHJmBCGDwpVVTh1fi2byp6gs/fSVOFrwdWLWdyYFzBIZtKcBTHtHl8nv93yGC+/tYqX1t/DG7uexnOFoYTNlIpedykw5gv28Na73+R/Nj/KbzY9xLvlv4+xH4kkWQspHv9ItChNRaGycR1r99/H+gOPsbnsSf5a+hn+vO9ejtb+ltbucjYe/hwllT/CF+jEF+jmb0efYdvRZ2jpPsLmsi/y92NPc6zuFU7W/4ny+tdiSuh1oqGvVH5sownDFVCUIKcb17Pz5DfxBa9dRmDo+osro5eMTBp384AJSj2eFirqtlPZsAuP7/KiAJCTOj3G81BVhZbOSkor3+DI2XU0d0bmYoxk9Doz8yb+C6mOadE2te8PhE40rKG0+iWO1b1CU+eh6A3e5T7HobMv0etvQVFDnO8o6ZuKr9LjPU/p2ZfZdPjzbDj0GU7UvRaTiUh3zsRuyo7uj1XGtDCIgh6zMYV050wKMu7gupwHmJp9H3mpy0i2TcGod1xVmk1VQ1Q2bqC89tVBo//vBZ0oXdV7D45AUd4d3Fj82UFqDVQEQSDZkcesglVxfbEkO/JYOvNJLHJSTDBR7VvNKRwODlreO9JItBWwYuZL5KXeimxIROi7rCOf45JnJggiBslGdtJCbpv5IonWAszGJG6a+k1S7EVIYiTVqKghgiE3gXBvVBREQY/TksfCSf9xzf9AeSSie/bZZ5+Nbxxp7Kv8YWS22zAwGRIpGv8gCyf9O3MmPkFRzqeYnH03hZkrmZT5CQoyPk6aoxhFDeLy1g2Zn75IWPFzoecUBRl3YhrGGhD9OXN+L75AD1ZTCg5LJvOmPIDNfPnFX2pbDtHjbcNqSsZqSmHupHtxWrPQiRITMq/HakrBF+ghrIQwSDJ2SzpTxi1jxfyvkJs+D5e7mRRHPimOfDKTpzF9wp2I4qWCm5zU6TisGQRDPsJKEElnwGR0kpZQQNGEFYxPm011UwlJtvGkOPJJdk5gQuZCJmReH3Oe9HlBje0nsMpJ0feckLmQ/Iz5fcKj0tFzBkEQSbDkk2DJJ8M5k7y0ZTFZB5e3AX+wO2qTbJvM1OzVA4ZVFxEQsJsyyU9bTpK1EF3f8EhAQJJMGCUbDst4clOWMDPvcRYWfomsxHnRYqoE60TGJ9+A2ZjaF3dQEEU9kmRB1jtJshYwKesuFk/+CnkpSxFFiUDYTae7Cquc0XeeEyjIuAN7XOWmN3CBHm8jDvO46OcpHv9IjM1IZFTMrvzRhnTc/qsLAAqCjoyEOdxS9D2yExfEFJwMRMUX6OJY7SvsPf1den3N8QYDmJjxcVYveOM9PTU8/i5C4Ys1+QIWORFdTHZhIF6/K2ZxE7MxIWampaoqePzdeLwdhJRgJJNhisxzUJQQ/n6LsEamNg/Mtauqgi/Qg9fvIhD0oJMMyHobJtmBJOojk7z62etEPQZp4PeqouIPumNqQCRRj76fbUjxRpd9AxDQRYu7LhJWAnGzHCMToq4OlZDixx/oxhfsRkVBRIdRb8egtyGJpiFTraqqEAj14g+5otWUOtGAUbJj1NtjJtepaphA2IvQ75uRdJcCmhdRlCAhJXaaf/9g6UhlTAmDIEhMTP8Yy6f/iERrbHDucihKiMqmt9hy5KmY6rjBkPUJ3Hv9WnJTb47v0tAYM7zXQe4IRCAnaRHLi39EonVifOdlEUWJyVn3cPvMn2HpW/hjKAKhngF/YKOhMdYYM8JgldNZct1/kWibOORY9Erkp93G1JxPXvb1ihqm7sI7+INXv6CshsZoY8wIw8S0FeQkL77sTX0lJJ1M8biHMBsvt4akistTS0fvmfiOa4qqqh/KfA0NjcEYE8IgChLFuY8OMWV3eKQ6ishOGhhx748ncIHO3uphpy7D4TAVFRXs3buXgwcP0t4+dAn34cOHaWuLVNi5XC7C4Uip8vHjx2luvnKQ9CKhUIienkgFYyAQYM+ePbjdw8vw9KempoZTp04NKloej4cjR46wd+9eSktLcbk+Oq+qurqa/fv38+6773LgwAF6ewfOMdEYmjEhDA5zLmlxC2K8VySdzPTxj8Y3xxBWAnR5zg179uKxY8fYv38/DoeDrq4utmzZgqqq+Hw+FEUhHA7j80Ui2FVVVXR3dxMIBNixYwft7e0oioIgCAiCQDAYxO/3o6oqfr8/Khwejwefz4fX60VVVVpbW9m7d2/0uKIoIooioVAIn8+Hy+UiEIis8aCqKl6vl56eHnw+36A3/65du9i5c2dUbC6iqiolJSVUVVXhdDqpq6vjwIEDhMNhgsFgzDkpikJPT0/0fekTze7uboLByMQ1RVHw+XwD7ILBYIxQhkIhvF5v9PNdxGQyEQwGOXfuHFarFZ1Oh6IouFwu/P5LGY/e3l48Hg9er5dgMEhvb2/0c6uqSm9vb8yx/X4/gUAAv99PKBTC7Xbj8XiiHp7b7cbrjWSCLv6eFz+Loih4PMP7B7SPijFRx5CVOI9p4z815Ay84WI357Cv8oeXrUxMcVxHXmokp301+P1+Nm7cyKJFi5g6dSrjx4+noKAAVVXZtGkTaWlpdHZ2snfvXvLz8zl58iSZmZk0NjZSUlKC2+1m3Lhx7N+/H4PBgNvtZtOmTeTl5bFhwwZSU1NpaGhg8+bNVFZWcujQIQoLCzl06BDHjh1DkiTS0tL4y1/+wowZM6ipqeGtt97i7Nmz1NTUkJubS3t7Oxs2bKCyspL9+/czbdo09PpL3+n58+eprq7GarVGj3cx9RcMBtm5cyerVq3CarWSmJiI3W7Hbrdz5MgRNm/eTDgcJjU1lS1btlBWVsaRI0fIyclBEAS2bNlCeXk5VVVVZGZm4vf7ef3116murubEiRMUFxfT0tLCunXrqKiooLGxkXHjxnH69GnWrl1LMBgkNzc3eq42mw1BEHC5XMybNw9VVdm+fTuHDh3i1KlT2O12HA4HL7zwAvX19ZSUlFBfXx8V7sTERHbv3s2+ffsoLy9HlmWSkpJYv349paWlWCwWWltbWbNmDT6fj8zMTEpKStizZw/Hjx9HliMp2k2bNiHLMhs2bMBqtbJr1y6mTbtUpTlSGRMeg0Fvfx9VhAMxSFZs8uBLjF3EF+i6rHDEoygKiqIgSREhufjUv/jEVxSFUCgU83QEmDZtGuPGjeOGG27AYrFEn1Q5OTn4fD7Ky8sJhUI4nU4OHDjA7NmzWblyZfTYRUVFFBQUMG/ePERRjD7dQqEQmZmZrFy5Ep1Oh9/v5/z58xQWFrJy5UrMZnOMx6AoCsePH0cQBGRZ5syZMwPOVRAERFGkqamJ8vJydu/ejdvtJhQKMWHCBObPn09HRwfl5eVkZGQgiiKnT5+mrq6O1tZWMjMzURSFtrY2VFXF4XBw9913R8/j7NmzqKpKRkYG9fX1uFwuQqEQqampzJ07N+Zc4mlvbycYDLJ69WqKioo4fPhw9PtevHgxJpOJgoICZs+eTUtLC6qqUlFRwcc+9jFuvfVWKioi5eF+v58VK1ZQWFhIOBzGZrNxww03EAwGOXXqFKtXr2b+/Pls3LgRs9kcbdfpdNHPPRq4dnfTR4ggCJdd1+C9YJUvn7YMhT2oXL0wyLLMjBkzKC0t5fTp05SUlLB161ZUVcVkMlFVVcXZswMnakmShCRJdHR0EApdKgySZZl58+ZRWlrKlClTMBqNOBwOWltbqa2tjdoaDAY8Hg/d3d0xNzp97rYsy1GvwGw209LSQm1t7YChgsvloqGhgezsbBwOB263O8ZGkiSysrLYsWMHqqpiNptxOByYTJGCIofDgV6vx2QyYTKZEEURp9NJdnY2ZrMZSZLQ6/UkJSWRkBBZcu7i+UmSFD1mKBTCaDSSl5eHxRIp1rJardEn9FAYjUZ8Ph8NDQ20trZit9sRxcjlbzab0el02O32GEE0mUw0NTVRW1uLyRQpaJNlmYSEBHS6SDxLlmXMZjN6vR5ZlqmpqaG5uZnU1FTMZjOZmZk0NDQwf/58Ghsbycwc+UvHM1aGEimOaUzOuntA1dn74UT9H+lyn4tvjuKw5DIle/VVL9slCAIZGRno9Xrq6uqQJIk5c+bgcDiw2+00NjZisVjIyMggNTUiShcvLr1eT0dHR9R1T01NxW6343Q6kSSJadOmYTAYyMjIoKOjA0VRyMjIICcnB1mW8Xq9hEIhkpKSUFWV/Px8RFHEYrGQmJiIqqokJSVhs9mi8YXOzk5mzJgR9XB8Ph+yLDNnzhxyc3ORZRmbzRa9YQRBID09HZ/PR1NTExaLhblz52KxWFBVFZvNhsPhQJZl0tLS6OnpwW63M3HiRBISErBYLLS3t5OYmEh2djaSJCGKIikpKaiqSnp6elRc3G43WVlZpKVFVpGyWCykpKQMqGhUVRW9Xk9ycnL0Bq6rq8NmszF79myMRiOhUIj8/HwkSSI9PT1ql5CQQEpKCo2Njeh0OmbNmoUsyyiKQmpqKqIoRkU9MzMzOrRqaGhAlmVuvPFGZFnGarXidDqZOHEiZrOZcePGYTRe3TXzUTImKh+n5tzPXXN/P2Bp8vfDmnc+zpnmodczmJhxO6vmrxkV5a1Xy4ULF9izZw96vR5BELjjjjviTTT+QRgTQ4kPAukK/7k4FklMTGTJkiXMmTOHW265Jb5b4x8ITRg0ooiiSEJCQtSl1vjHZUwIg6qEBwTWNDQ03jtjQhjC6oe/oEgo7BtWulJDYzQxJoRB0skDItLvlyvd9MGQ50MXIw2ND4sxIQwQWa3nWhK4wgrJmihojGXGjDBca7QbX+MfmTEhDJF/Mb62HsOV0OvM19xL0dAYKYyKAicNDY0PlzHhMWhoaFxbNGHQ0NAYwP8Hv2AZN1x4tfIAAAAASUVORK5CYII=";

// ─── UTILS ─────────────────────────────────────────────────────────────────
const genId = () => Math.random().toString(36).substr(2, 9);

const fmt = {
  time: (d) =>
    new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  date: (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  shortDate: (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  dayGroup: (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }),
};

const P_COLOR = {
  high:   { bg: "#fff1f2", text: "#e11d48", dot: "#e11d48" },
  medium: { bg: "#fefce8", text: "#ca8a04", dot: "#eab308" },
  low:    { bg: "#f0fdf4", text: "#16a34a", dot: "#22c55e" },
};

// ─── STORAGE HELPERS ───────────────────────────────────────────────────────
const store = {
  get: async (k) => {
    try {
      const v = localStorage.getItem(k); const r = v ? { value: v } : null;
      return r ? JSON.parse(r.value) : null;
    } catch { return null; }
  },
  set: async (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  },
};

// ─── ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]             = useState("today");
  const [events, setEvents]       = useState([]);
  const [tasks, setTasks]         = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [metrics, setMetrics]     = useState([]);
  const [notes, setNotes]         = useState([]);
  const [focus, setFocus]         = useState("");
  const [ready, setReady]         = useState(false);
  const [now, setNow]             = useState(new Date());

  // Google Font — Plus Jakarta Sans
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  // Clock tick
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  // Load from storage
  useEffect(() => {
    (async () => {
      const e = await store.get("nf2:events");    if (e) setEvents(e);
      const t = await store.get("nf2:tasks");     if (t) setTasks(t);
      const d = await store.get("nf2:decisions"); if (d) setDecisions(d);
      const m = await store.get("nf2:metrics");   if (m) setMetrics(m);
      const n = await store.get("nf2:notes");     if (n) setNotes(n);
      const f = await store.get("nf2:focus");     if (f) setFocus(f);
      setReady(true);
    })();
  }, []);

  const saveEvents    = (v) => { setEvents(v);    store.set("nf2:events", v);    };
  const saveTasks     = (v) => { setTasks(v);     store.set("nf2:tasks", v);     };
  const saveDecisions = (v) => { setDecisions(v); store.set("nf2:decisions", v); };
  const saveMetrics   = (v) => { setMetrics(v);   store.set("nf2:metrics", v);   };
  const saveNotes     = (v) => { setNotes(v);     store.set("nf2:notes", v);     };
  const saveFocus     = (v) => { setFocus(v);     store.set("nf2:focus", v);     };

  const addEvent    = (e) => saveEvents([...events, { ...e, id: genId() }]);
  const delEvent    = (id) => saveEvents(events.filter((e) => e.id !== id));
  const addTask     = (t) => saveTasks([...tasks, { ...t, id: genId(), done: false, createdAt: new Date().toISOString() }]);
  const toggleTask  = (id) => saveTasks(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const delTask     = (id) => saveTasks(tasks.filter((t) => t.id !== id));
  const addDecision = (d) => saveDecisions([...decisions, { ...d, id: genId(), date: new Date().toISOString() }]);
  const delDecision = (id) => saveDecisions(decisions.filter((d) => d.id !== id));
  const addMetric   = (m) => saveMetrics([...metrics, { ...m, id: genId(), history: [] }]);
  const updateMetricValue = (id, newVal) => saveMetrics(metrics.map(m =>
    m.id !== id ? m : { ...m, prev: m.value, value: newVal, history: [...(m.history || []), { value: m.value, date: new Date().toISOString() }] }
  ));
  const delMetric   = (id) => saveMetrics(metrics.filter(m => m.id !== id));
  const addNote     = (n) => saveNotes([{ ...n, id: genId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), pinned: false }, ...notes]);
  const updateNote  = (id, upd) => saveNotes(notes.map(n => n.id === id ? { ...n, ...upd, updatedAt: new Date().toISOString() } : n));
  const delNote     = (id) => saveNotes(notes.filter(n => n.id !== id));
  const togglePin   = (id) => saveNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));

  const todayEvents = events
    .filter((e) => new Date(e.datetime).toDateString() === now.toDateString())
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  const pending     = tasks.filter((t) => !t.done);
  const highPri     = pending.filter((t) => t.priority === "high");

  const NAV = [
    { id: "today",     label: "Today",       icon: "🏠" },
    { id: "schedule",  label: "Schedule",    icon: "📅" },
    { id: "tasks",     label: "Tasks",       icon: "✅" },
    { id: "metrics",   label: "Metrics",     icon: "📊" },
    { id: "notes",     label: "Notes",       icon: "🗒️" },
    { id: "ai",        label: "AI Co-pilot", icon: "🤖" },
    { id: "decisions", label: "Decisions",   icon: "🧭" },
  ];

  if (!ready) return (
    <div style={s.center}>
      <div style={s.spinner} />
      <p style={{ color: "#22c55e", marginTop: 12, fontSize: 14 }}>Loading Nutrifresh OS…</p>
    </div>
  );

  return (
    <div style={s.shell}>
      {/* ── SIDEBAR ──────────────────────────────────────────── */}
      <aside style={s.sidebar}>
        <div style={s.brand}>
          <div style={s.logoWrap}>
            <img
              src={`data:image/png;base64,${LOGO_B64}`}
              alt="Nutrifresh"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div style={s.brandSub}>Founder OS</div>
        </div>

        <nav style={s.nav}>
          {NAV.map((n) => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              ...s.navBtn,
              ...(tab === n.id ? s.navBtnActive : {}),
            }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <div style={s.clock}>
          <div style={s.clockTime}>
            {now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div style={s.clockDate}>
            {now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
          </div>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <main style={s.main}>
        {tab === "today"     && <Today     events={todayEvents} pending={pending} highPri={highPri} decisions={decisions} now={now} focus={focus} saveFocus={saveFocus} addEvent={addEvent} toggleTask={toggleTask} setTab={setTab} />}
        {tab === "schedule"  && <Schedule  events={events} addEvent={addEvent} delEvent={delEvent} now={now} />}
        {tab === "tasks"     && <Tasks     tasks={tasks} addTask={addTask} toggleTask={toggleTask} delTask={delTask} />}
        {tab === "metrics"   && <Metrics   metrics={metrics} addMetric={addMetric} updateMetricValue={updateMetricValue} delMetric={delMetric} />}
        {tab === "notes"     && <Notes     notes={notes} addNote={addNote} updateNote={updateNote} delNote={delNote} togglePin={togglePin} />}
        {tab === "ai"        && <AI        todayEvents={todayEvents} pending={pending} decisions={decisions} />}
        {tab === "decisions" && <Decisions decisions={decisions} addDecision={addDecision} delDecision={delDecision} />}
      </main>
    </div>
  );
}

// ─── TODAY ─────────────────────────────────────────────────────────────────
function Today({ events, pending, highPri, decisions, now, focus, saveFocus, addEvent, toggleTask, setTab }) {
  const [modal, setModal] = useState(false);
  const [form,  setForm ] = useState({ title: "", datetime: "", participants: "", notes: "" });
  const hr = now.getHours();
  const greeting = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";

  const submit = () => {
    if (!form.title || !form.datetime) return;
    addEvent(form);
    setForm({ title: "", datetime: "", participants: "", notes: "" });
    setModal(false);
  };

  const stats = [
    { val: events.length,    label: "Meetings today",   icon: "📅", text: "#1d4ed8" },
    { val: pending.length,   label: "Tasks pending",    icon: "⏳", text: "#15803d" },
    { val: highPri.length,   label: "High priority",    icon: "🔥", text: "#be123c" },
    { val: decisions.length, label: "Decisions logged", icon: "🧭", text: "#b45309" },
  ];

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.h1}>{greeting}, Founder 👋</h1>
          <p style={s.sub}>{fmt.date(now)}</p>
        </div>
      </div>

      {/* Focus Goal */}
      <div style={{ background: "linear-gradient(135deg, #0d4025 0%, #166534 100%)", borderRadius: 14, padding: "18px 24px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#86efac", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          🎯 Today's One Big Win
        </div>
        <input
          value={focus}
          onChange={e => saveFocus(e.target.value)}
          placeholder="What's the ONE thing that would make today a success?"
          style={{ background: "transparent", border: "none", outline: "none", width: "100%", fontSize: 16, fontWeight: 600, color: "#fff", caretColor: "#4ade80", fontFamily: "inherit", letterSpacing: "-0.01em" }}
        />
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {stats.map((st, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{st.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: st.text, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>{st.val}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Three columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {/* Today's schedule */}
        <Card title="📅 Today's Schedule" action={<Btn sm onClick={() => setModal(true)}>+ Add</Btn>}>
          {events.length === 0 ? (
            <Empty icon="🌿" msg="No meetings today." />
          ) : events.map((e) => (
            <div key={e.id} style={s.eventRow}>
              <div style={s.eventTime}>{fmt.time(e.datetime)}</div>
              <div>
                <div style={s.eventTitle}>{e.title}</div>
                {e.participants && <div style={s.eventMeta}>👥 {e.participants}</div>}
                {e.notes       && <div style={s.eventMeta}>📝 {e.notes}</div>}
              </div>
            </div>
          ))}
        </Card>

        {/* High priority tasks */}
        <Card title="🔥 High Priority" action={<Btn sm ghost onClick={() => setTab("tasks")}>All →</Btn>}>
          {highPri.length === 0 ? (
            <Empty icon="🎉" msg="Nothing urgent right now." />
          ) : highPri.slice(0, 6).map((t) => (
            <div key={t.id} style={s.taskRow}>
              <button onClick={() => toggleTask(t.id)} style={s.circle} />
              <div>
                <div style={s.taskTitle}>{t.title}</div>
                <div style={s.taskMeta}>{t.category}</div>
              </div>
            </div>
          ))}
        </Card>

        {/* Pomodoro Timer */}
        <PomodoroWidget />
      </div>

      {modal && (
        <Modal title="Add Meeting / Event" onClose={() => setModal(false)}>
          <Fields form={form} setForm={setForm} fields={EVENT_FIELDS} />
          <Btn full onClick={submit}>Add to Schedule</Btn>
        </Modal>
      )}
    </div>
  );
}

// ─── POMODORO TIMER ────────────────────────────────────────────────────────
function PomodoroWidget() {
  const [mins, setMins]       = useState(25);
  const [secs, setSecs]       = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode]       = useState("focus");
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSecs(prev => {
        if (prev > 0) return prev - 1;
        setMins(m => {
          if (m > 0) return m - 1;
          setRunning(false);
          if (mode === "focus") {
            setSessions(s => s + 1);
            setMode("break"); setMins(5);
          } else {
            setMode("focus"); setMins(25);
          }
          return 0;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, mode]);

  const reset = () => { setRunning(false); setMins(mode === "focus" ? 25 : 5); setSecs(0); };
  const pct   = ((( mode === "focus" ? 25 : 5 ) * 60 - (mins * 60 + secs)) / (( mode === "focus" ? 25 : 5 ) * 60)) * 100;

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0d4025" }}>⏱️ Focus Timer</span>
        <span style={{ fontSize: 11, background: "#f0fdf4", color: "#15803d", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>{sessions} done</span>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {[["focus","🧠 Focus",25],["break","☕ Break",5]].map(([m, label, dur]) => (
          <button key={m} onClick={() => { setMode(m); setRunning(false); setMins(dur); setSecs(0); }} style={{
            flex:1, padding:"5px 0", borderRadius:99, border:"none", cursor:"pointer", fontSize:11.5, fontWeight:600,
            background: mode === m ? "#0d4025" : "#f1f5f9",
            color: mode === m ? "#fff" : "#64748b",
          }}>{label}</button>
        ))}
      </div>
      {/* Progress ring */}
      <div style={{ textAlign: "center", position: "relative", marginBottom: 14 }}>
        <svg width={100} height={100} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={50} cy={50} r={42} fill="none" stroke="#f1f5f9" strokeWidth={8} />
          <circle cx={50} cy={50} r={42} fill="none" stroke={mode==="focus"?"#16a34a":"#f59e0b"} strokeWidth={8}
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.9s linear" }}
          />
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
          <span style={{ fontSize:22, fontWeight:800, color:"#0f172a", fontVariantNumeric:"tabular-nums", letterSpacing:"-0.04em" }}>
            {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
          </span>
        </div>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={() => setRunning(r=>!r)} style={{ flex:1, padding:"8px 0", borderRadius:8, border:"none", cursor:"pointer", fontWeight:700, fontSize:13,
          background: running ? "#fff1f2" : "#16a34a", color: running ? "#dc2626" : "#fff" }}>
          {running ? "⏸ Pause" : "▶ Start"}
        </button>
        <button onClick={reset} style={{ padding:"8px 14px", borderRadius:8, border:"1px solid #e2e8f0", background:"#fff", cursor:"pointer", color:"#64748b", fontSize:16 }}>↺</button>
      </div>
    </div>
  );
}

// ─── SCHEDULE ──────────────────────────────────────────────────────────────
function Schedule({ events, addEvent, delEvent, now }) {
  const [modal,  setModal ] = useState(false);
  const [filter, setFilter] = useState("upcoming");
  const [form,   setForm  ] = useState({ title: "", datetime: "", participants: "", notes: "" });

  const filtered = events
    .filter((e) =>
      filter === "upcoming"
        ? new Date(e.datetime) >= now
        : new Date(e.datetime) < now
    )
    .sort((a, b) =>
      filter === "upcoming"
        ? new Date(a.datetime) - new Date(b.datetime)
        : new Date(b.datetime) - new Date(a.datetime)
    );

  // Group by day
  const groups = filtered.reduce((acc, e) => {
    const k = new Date(e.datetime).toDateString();
    if (!acc[k]) acc[k] = [];
    acc[k].push(e);
    return acc;
  }, {});

  const submit = () => {
    if (!form.title || !form.datetime) return;
    addEvent(form);
    setForm({ title: "", datetime: "", participants: "", notes: "" });
    setModal(false);
  };

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.h1}>📅 Schedule</h1>
          <p style={s.sub}>{events.length} events logged</p>
        </div>
        <Btn onClick={() => setModal(true)}>+ Add Event</Btn>
      </div>

      <Pills
        options={[{ val: "upcoming", label: "⏭ Upcoming" }, { val: "past", label: "⏮ Past" }]}
        value={filter}
        onChange={setFilter}
      />

      {Object.keys(groups).length === 0 ? (
        <Empty icon="📭" msg={`No ${filter} events. Add one to get started.`} padded />
      ) : Object.entries(groups).map(([day, evts]) => (
        <div key={day} style={{ marginBottom: 24 }}>
          <div style={s.groupLabel}>{fmt.dayGroup(new Date(day))}</div>
          {evts.map((e) => (
            <div key={e.id} style={s.scheduleCard}>
              <div style={s.scheduleTime}>
                <span>{fmt.time(e.datetime)}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={s.eventTitle}>{e.title}</div>
                {e.participants && <div style={s.eventMeta}>👥 {e.participants}</div>}
                {e.notes       && <div style={s.eventMeta}>📝 {e.notes}</div>}
              </div>
              <button onClick={() => delEvent(e.id)} style={s.del}>🗑</button>
            </div>
          ))}
        </div>
      ))}

      {modal && (
        <Modal title="Add Event" onClose={() => setModal(false)}>
          <Fields form={form} setForm={setForm} fields={EVENT_FIELDS} />
          <Btn full onClick={submit}>Save Event</Btn>
        </Modal>
      )}
    </div>
  );
}

// ─── TASKS ─────────────────────────────────────────────────────────────────
const CATS = ["Product", "Operations", "Marketing", "Finance", "HR", "Sales", "Tech", "Other"];

function Tasks({ tasks, addTask, toggleTask, delTask }) {
  const [modal,  setModal ] = useState(false);
  const [status, setStatus] = useState("pending");
  const [pri,    setPri   ] = useState("all");
  const [form,   setForm  ] = useState({ title: "", priority: "medium", category: "Operations", dueDate: "" });

  const filtered = tasks
    .filter((t) => (status === "pending" ? !t.done : t.done))
    .filter((t) => pri === "all" || t.priority === pri)
    .sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.priority] - { high: 0, medium: 1, low: 2 }[b.priority]));

  const submit = () => {
    if (!form.title) return;
    addTask(form);
    setForm({ title: "", priority: "medium", category: "Operations", dueDate: "" });
    setModal(false);
  };

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.h1}>✅ Tasks</h1>
          <p style={s.sub}>{tasks.filter((t) => !t.done).length} pending · {tasks.filter((t) => t.done).length} done</p>
        </div>
        <Btn onClick={() => setModal(true)}>+ Add Task</Btn>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        <Pills
          options={[{ val: "pending", label: "⏳ Pending" }, { val: "done", label: "✅ Done" }]}
          value={status} onChange={setStatus}
        />
        <div style={{ width: 1, background: "#e2e8f0", margin: "0 6px" }} />
        <Pills
          options={[
            { val: "all",    label: "All" },
            { val: "high",   label: "🔴 High" },
            { val: "medium", label: "🟡 Medium" },
            { val: "low",    label: "🟢 Low" },
          ]}
          value={pri} onChange={setPri}
        />
      </div>

      {filtered.length === 0 ? (
        <Empty icon={status === "done" ? "🏆" : "🌿"} msg={status === "done" ? "No completed tasks yet." : "All clear here!"} padded />
      ) : filtered.map((t) => {
        const pc = P_COLOR[t.priority];
        return (
          <div key={t.id} style={{ ...s.taskCard, opacity: t.done ? 0.55 : 1 }}>
            <button onClick={() => toggleTask(t.id)} style={{
              ...s.circle,
              ...(t.done ? { background: "#22c55e", borderColor: "#22c55e" } : {}),
              flexShrink: 0,
            }}>
              {t.done && <span style={{ color: "#fff", fontSize: 11, lineHeight: 1 }}>✓</span>}
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ ...s.taskTitle, textDecoration: t.done ? "line-through" : "none" }}>{t.title}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: pc.bg, color: pc.text, fontWeight: 700, letterSpacing: "0.04em" }}>
                  {t.priority.toUpperCase()}
                </span>
                <span style={s.taskMeta}>{t.category}</span>
                {t.dueDate && <span style={s.taskMeta}>Due {new Date(t.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
              </div>
            </div>
            <button onClick={() => delTask(t.id)} style={s.del}>🗑</button>
          </div>
        );
      })}

      {modal && (
        <Modal title="Add Task" onClose={() => setModal(false)}>
          <Field label="Task" placeholder="What needs to get done?" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={s.label}>Priority</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} style={s.select}>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
            <div>
              <label style={s.label}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={s.select}>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <Field label="Due date (optional)" type="date" value={form.dueDate} onChange={(v) => setForm({ ...form, dueDate: v })} />
          <Btn full onClick={submit}>Add Task</Btn>
        </Modal>
      )}
    </div>
  );
}

// ─── AI CO-PILOT ───────────────────────────────────────────────────────────
const QUICK = [
  { label: "📋 Meeting prep",    prompt: "Help me prepare for my next meeting. What questions should I ask and what should I ensure is covered?" },
  { label: "📧 Draft email",     prompt: "Help me draft a crisp professional email to an investor or partner with a progress update from Nutrifresh." },
  { label: "⚖️ Decision framework", prompt: "I need to make an important decision. Walk me through a structured framework to think it through." },
  { label: "📊 Weekly review",   prompt: "Help me structure a weekly founder review: what metrics and areas should I cover for Nutrifresh?" },
  { label: "🎯 Set OKRs",        prompt: "Help me draft OKRs for next quarter for a fresh food/nutrition startup like Nutrifresh." },
  { label: "💡 Validate idea",   prompt: "I have a new product or business idea for Nutrifresh. Help me run a structured validation." },
];

function AI({ todayEvents, pending, decisions }) {
  const [msgs,  setMsgs ] = useState([
    { role: "assistant", content: "Hi! I'm your Nutrifresh AI Co-pilot 🌿\n\nI'm aware of your today's schedule, pending tasks, and past decisions. Ask me anything — meeting prep, drafts, decision frameworks, OKRs, or just thinking through a problem." },
  ]);
  const [input, setInput ] = useState("");
  const [busy,  setBusy  ] = useState(false);
  const bottom             = useRef(null);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (text) => {
    const q = text || input;
    if (!q.trim() || busy) return;
    const next = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setInput("");
    setBusy(true);

    try {
      const sys = `You are the AI Co-pilot for Nutrifresh, a fresh food and nutrition startup. You assist the founder with business strategy, operations, communication, and day-to-day decision-making.

Current context (today):
- Meetings: ${todayEvents.map((e) => e.title).join(", ") || "None"}
- High priority tasks: ${pending.filter((t) => t.priority === "high").slice(0, 5).map((t) => t.title).join(", ") || "None"}
- Recent decisions: ${decisions.slice(0, 3).map((d) => d.title).join(", ") || "None"}

Be concise, action-oriented, and founder-friendly. Use bullet points and structure when helpful. Lead with the most useful information.`;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: sys,
          messages: next.slice(next.findIndex(m => m.role === "user")).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.map((c) => c.text || "").join("") || "Sorry, could not get a response.";
      setMsgs((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMsgs((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setBusy(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{ padding: "28px 32px 16px", borderBottom: "1px solid #e2e8f0" }}>
        <h1 style={s.h1}>🤖 AI Co-pilot</h1>
        <p style={s.sub}>Powered by Claude · Context-aware for Nutrifresh</p>
      </div>

      <div style={{ padding: "10px 32px", display: "flex", gap: 6, flexWrap: "wrap", borderBottom: "1px solid #f1f5f9" }}>
        {QUICK.map((q, i) => (
          <button key={i} onClick={() => send(q.prompt)} style={s.quickBtn}>{q.label}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 32px" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 14 }}>
            {m.role === "assistant" && (
              <div style={s.avatar}>🤖</div>
            )}
            <div style={{
              maxWidth: "68%",
              padding: "12px 16px",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.role === "user" ? "#16a34a" : "#fff",
              color: m.role === "user" ? "#fff" : "#0f172a",
              border: m.role === "assistant" ? "1px solid #e2e8f0" : "none",
              fontSize: 13.5,
              lineHeight: 1.65,
              whiteSpace: "pre-wrap",
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {busy && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={s.avatar}>🤖</div>
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "12px 16px", borderRadius: "16px 16px 16px 4px", fontSize: 13, color: "#94a3b8" }}>
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottom} />
      </div>

      <div style={{ padding: "14px 32px", borderTop: "1px solid #e2e8f0", display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ask anything — meetings, drafts, decisions, strategy…"
          style={{ ...s.input, flex: 1 }}
        />
        <button
          onClick={() => send()}
          disabled={busy || !input.trim()}
          style={{
            width: 42, height: 42, borderRadius: "50%", border: "none",
            background: busy || !input.trim() ? "#e2e8f0" : "#16a34a",
            color: "#fff", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

// ─── DECISIONS ─────────────────────────────────────────────────────────────
function Decisions({ decisions, addDecision, delDecision }) {
  const [modal, setModal] = useState(false);
  const [form,  setForm ] = useState({ title: "", context: "", decision: "", outcome: "" });

  const submit = () => {
    if (!form.title || !form.decision) return;
    addDecision(form);
    setForm({ title: "", context: "", decision: "", outcome: "" });
    setModal(false);
  };

  const sorted = [...decisions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.h1}>🧭 Decision Log</h1>
          <p style={s.sub}>{decisions.length} decisions recorded</p>
        </div>
        <Btn onClick={() => setModal(true)}>+ Log Decision</Btn>
      </div>

      {sorted.length === 0 ? (
        <Empty icon="📋" msg="Log decisions here to build institutional memory for Nutrifresh." padded />
      ) : sorted.map((d) => (
        <div key={d.id} style={s.decCard}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{d.title}</div>
              <span style={{ fontSize: 11, color: "#94a3b8", flexShrink: 0, marginTop: 2 }}>
                {new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
            {d.context && (
              <div style={{ marginTop: 10 }}>
                <div style={s.decLabel}>Context</div>
                <div style={s.decText}>{d.context}</div>
              </div>
            )}
            <div style={{ marginTop: 8 }}>
              <div style={{ ...s.decLabel, color: "#15803d" }}>Decision made</div>
              <div style={s.decText}>{d.decision}</div>
            </div>
            {d.outcome && (
              <div style={{ marginTop: 8 }}>
                <div style={s.decLabel}>Expected outcome</div>
                <div style={s.decText}>{d.outcome}</div>
              </div>
            )}
          </div>
          <button onClick={() => delDecision(d.id)} style={{ ...s.del, alignSelf: "flex-start", marginLeft: 12 }}>🗑</button>
        </div>
      ))}

      {modal && (
        <Modal title="Log a Decision" onClose={() => setModal(false)} wide>
          <AreaField label="Decision title" placeholder="e.g. Hired new Ops Head" value={form.title} onChange={(v) => setForm({ ...form, title: v })} rows={1} />
          <AreaField label="Context / background" placeholder="Why was this decision needed?" value={form.context} onChange={(v) => setForm({ ...form, context: v })} />
          <AreaField label="Decision made" placeholder="What was decided and why?" value={form.decision} onChange={(v) => setForm({ ...form, decision: v })} />
          <AreaField label="Expected outcome" placeholder="What do you expect to happen?" value={form.outcome} onChange={(v) => setForm({ ...form, outcome: v })} />
          <Btn full onClick={submit}>Log Decision</Btn>
        </Modal>
      )}
    </div>
  );
}

// ─── METRICS ───────────────────────────────────────────────────────────────
const METRIC_CATS = ["Revenue", "Growth", "Product", "Team", "Finance", "Other"];
const CAT_STYLE = {
  Revenue: { bg:"#f0fdf4", border:"#86efac", text:"#15803d" },
  Growth:  { bg:"#eff6ff", border:"#93c5fd", text:"#1d4ed8" },
  Product: { bg:"#faf5ff", border:"#d8b4fe", text:"#7c3aed" },
  Team:    { bg:"#fff7ed", border:"#fdba74", text:"#c2410c" },
  Finance: { bg:"#fefce8", border:"#fde047", text:"#854d0e" },
  Other:   { bg:"#f8fafc", border:"#cbd5e1", text:"#475569" },
};

function trendIcon(curr, prev) {
  const c = parseFloat(curr), p = parseFloat(prev);
  if (isNaN(c) || isNaN(p) || prev === "" || prev === undefined) return null;
  return c > p ? "↑" : c < p ? "↓" : "→";
}
function trendColor(icon, higherIsBetter) {
  if (!icon) return "#94a3b8";
  if (icon === "→") return "#94a3b8";
  return (icon === "↑") === !!higherIsBetter ? "#16a34a" : "#e11d48";
}

function Metrics({ metrics, addMetric, updateMetricValue, delMetric }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editId,  setEditId ] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [form, setForm] = useState({ name:"", value:"", unit:"", target:"", category:"Revenue", higherIsBetter:true });

  const submit = () => {
    if (!form.name || !form.value) return;
    addMetric(form);
    setForm({ name:"", value:"", unit:"", target:"", category:"Revenue", higherIsBetter:true });
    setShowAdd(false);
  };

  const commit = (id) => {
    if (editVal.trim()) updateMetricValue(id, editVal.trim());
    setEditId(null); setEditVal("");
  };

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.h1}>📊 Metrics</h1>
          <p style={s.sub}>{metrics.length} KPIs tracked</p>
        </div>
        <Btn onClick={() => setShowAdd(true)}>+ Add KPI</Btn>
      </div>

      {metrics.length === 0 ? (
        <div style={{ background:"#fff", border:"2px dashed #bbf7d0", borderRadius:16, padding:"52px 32px", textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>📊</div>
          <div style={{ fontSize:16, fontWeight:800, color:"#14532d", marginBottom:6 }}>Track what matters</div>
          <p style={{ color:"#64748b", fontSize:13, margin:"0 0 18px" }}>Add MRR, customer count, burn rate — any number your business watches.</p>
          <Btn onClick={() => setShowAdd(true)}>+ Add Your First KPI</Btn>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {metrics.map(m => {
            const cs  = CAT_STYLE[m.category] || CAT_STYLE.Other;
            const icon = trendIcon(m.value, m.prev);
            const tc   = trendColor(icon, m.higherIsBetter !== false);
            const pct  = m.target && parseFloat(m.target) > 0 ? Math.min(100, Math.round(parseFloat(m.value)/parseFloat(m.target)*100)) : null;
            const unitInline = m.unit && !["months","days","%"].includes(m.unit);
            return (
              <div key={m.id} style={{ background:"#fff", border:`1px solid ${cs.border}`, borderRadius:14, padding:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <span style={{ fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:99, background:cs.bg, color:cs.text }}>{m.category}</span>
                  <button onClick={() => delMetric(m.id)} style={s.del}>🗑</button>
                </div>
                <div style={{ fontSize:12, color:"#64748b", marginBottom:4, fontWeight:500 }}>{m.name}</div>
                {editId === m.id ? (
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                    <input autoFocus value={editVal} onChange={e=>setEditVal(e.target.value)}
                      onBlur={()=>commit(m.id)} onKeyDown={e=>e.key==="Enter"&&commit(m.id)}
                      style={{ ...s.input, fontSize:20, fontWeight:800, padding:"4px 8px", width:90 }} />
                    <span style={{ fontSize:13, color:"#64748b" }}>{m.unit}</span>
                  </div>
                ) : (
                  <div onClick={() => { setEditId(m.id); setEditVal(m.value); }}
                    title="Click to update" style={{ display:"flex", alignItems:"baseline", gap:4, cursor:"pointer", marginBottom:8 }}>
                    {unitInline && <span style={{ fontSize:18, fontWeight:700, color:"#64748b" }}>{m.unit}</span>}
                    <span style={{ fontSize:30, fontWeight:800, color:"#0f172a", fontVariantNumeric:"tabular-nums", letterSpacing:"-0.04em" }}>
                      {parseFloat(m.value).toLocaleString("en-IN")}
                    </span>
                    {!unitInline && m.unit && <span style={{ fontSize:14, color:"#64748b" }}>{m.unit}</span>}
                    {icon && <span style={{ fontSize:20, fontWeight:800, color:tc, marginLeft:4 }}>{icon}</span>}
                  </div>
                )}
                {pct !== null && (
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:11, color:"#94a3b8" }}>Target: {unitInline?m.unit:""}{parseFloat(m.target).toLocaleString("en-IN")}{!unitInline&&m.unit?" "+m.unit:""}</span>
                      <span style={{ fontSize:11, fontWeight:700, color:pct>=100?"#16a34a":"#64748b" }}>{pct}%</span>
                    </div>
                    <div style={{ height:5, background:"#f1f5f9", borderRadius:99 }}>
                      <div style={{ height:"100%", width:`${pct}%`, background:pct>=100?"#22c55e":"#3b82f6", borderRadius:99, transition:"width 0.4s" }} />
                    </div>
                  </div>
                )}
                {m.prev !== undefined && m.prev !== "" && (
                  <div style={{ fontSize:11, color:"#94a3b8", marginTop:8 }}>
                    Prev: {unitInline?m.unit:""}{parseFloat(m.prev).toLocaleString("en-IN")}{!unitInline&&m.unit?" "+m.unit:""}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showAdd && (
        <Modal title="Add KPI" onClose={() => setShowAdd(false)}>
          <Field label="Metric name" placeholder="e.g. Monthly Revenue (MRR)" value={form.name} onChange={v=>setForm({...form,name:v})} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Field label="Current value" placeholder="e.g. 85000" value={form.value} onChange={v=>setForm({...form,value:v})} />
            <Field label="Unit" placeholder="₹  /  %  /  users" value={form.unit} onChange={v=>setForm({...form,unit:v})} />
          </div>
          <Field label="Target (optional)" placeholder="e.g. 200000" value={form.target} onChange={v=>setForm({...form,target:v})} />
          <div style={{ marginBottom:14 }}>
            <label style={s.label}>Category</label>
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={s.select}>
              {METRIC_CATS.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18, cursor:"pointer" }} onClick={()=>setForm({...form,higherIsBetter:!form.higherIsBetter})}>
            <div style={{ width:20, height:20, borderRadius:4, border:`2px solid ${form.higherIsBetter?"#16a34a":"#d1d5db"}`, background:form.higherIsBetter?"#16a34a":"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {form.higherIsBetter && <span style={{ color:"#fff", fontSize:12 }}>✓</span>}
            </div>
            <span style={{ fontSize:13, color:"#374151" }}>Higher = better (affects trend colour)</span>
          </div>
          <Btn full onClick={submit}>Add KPI</Btn>
        </Modal>
      )}
    </div>
  );
}

// ─── NOTES ─────────────────────────────────────────────────────────────────
function Notes({ notes, addNote, updateNote, delNote, togglePin }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editId,  setEditId ] = useState(null);
  const [search,  setSearch ] = useState("");
  const [form, setForm] = useState({ title:"", body:"" });

  const submit = () => {
    if (!form.body.trim()) return;
    addNote(form);
    setForm({ title:"", body:"" });
    setShowAdd(false);
  };

  const sorted = [...notes]
    .filter(n => {
      if (!search) return true;
      const q = search.toLowerCase();
      return n.title?.toLowerCase().includes(q) || n.body?.toLowerCase().includes(q);
    })
    .sort((a,b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.h1}>🗒️ Notes</h1>
          <p style={s.sub}>{notes.length} notes saved</p>
        </div>
        <Btn onClick={() => setShowAdd(true)}>+ New Note</Btn>
      </div>

      {notes.length > 3 && (
        <input placeholder="🔍  Search notes…" value={search} onChange={e=>setSearch(e.target.value)}
          style={{ ...s.input, marginBottom:16, background:"#fff" }} />
      )}

      {sorted.length === 0 ? (
        <Empty icon="🗒️" msg="No notes yet. Capture ideas, meeting summaries, or anything on your mind." padded />
      ) : (
        <div style={{ columns:2, gap:14 }}>
          {sorted.map(n => (
            <div key={n.id} style={{ breakInside:"avoid", marginBottom:14, background:"#fff", border:"1px solid #e2e8f0",
              borderRadius:12, padding:16, borderTop: n.pinned ? "3px solid #22c55e" : "1px solid #e2e8f0" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                {n.title
                  ? <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", flex:1, lineHeight:1.3 }}>{n.title}</div>
                  : <div style={{ flex:1 }} />
                }
                <div style={{ display:"flex", gap:2, flexShrink:0, marginLeft:8 }}>
                  <button onClick={()=>togglePin(n.id)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:13,opacity:n.pinned?1:0.25 }} title={n.pinned?"Unpin":"Pin"}>📌</button>
                  <button onClick={()=>setEditId(editId===n.id?null:n.id)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:13 }} title="Edit">✏️</button>
                  <button onClick={()=>delNote(n.id)} style={s.del}>🗑</button>
                </div>
              </div>
              {editId === n.id ? (
                <div>
                  <input value={n.title||""} onChange={e=>updateNote(n.id,{title:e.target.value})}
                    placeholder="Title (optional)" style={{ ...s.input,marginBottom:8,fontSize:13,fontWeight:600 }} />
                  <textarea value={n.body} onChange={e=>updateNote(n.id,{body:e.target.value})} rows={4}
                    style={{ ...s.input,resize:"vertical",fontFamily:"inherit",fontSize:13 }} />
                  <button onClick={()=>setEditId(null)} style={{ marginTop:8,fontSize:12,color:"#16a34a",background:"none",border:"none",cursor:"pointer",fontWeight:700 }}>Done ✓</button>
                </div>
              ) : (
                <p style={{ margin:0, fontSize:13, color:"#475569", lineHeight:1.65, whiteSpace:"pre-wrap" }}>{n.body}</p>
              )}
              <div style={{ fontSize:11, color:"#cbd5e1", marginTop:10 }}>
                {new Date(n.updatedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <Modal title="New Note" onClose={() => setShowAdd(false)}>
          <Field label="Title (optional)" placeholder="Note title…" value={form.title} onChange={v=>setForm({...form,title:v})} />
          <AreaField label="Note" placeholder="Idea, insight, meeting summary, anything…" value={form.body} onChange={v=>setForm({...form,body:v})} rows={5} />
          <Btn full onClick={submit}>Save Note</Btn>
        </Modal>
      )}
    </div>
  );
}

// ─── SHARED FIELD DATA ─────────────────────────────────────────────────────
const EVENT_FIELDS = [
  { label: "Title",        key: "title",        type: "text",          placeholder: "e.g. Investor call" },
  { label: "Date & Time",  key: "datetime",     type: "datetime-local", placeholder: "" },
  { label: "Participants", key: "participants",  type: "text",          placeholder: "Names or teams" },
  { label: "Agenda / Notes", key: "notes",      type: "text",          placeholder: "Brief prep notes" },
];

// ─── SMALL COMPONENTS ──────────────────────────────────────────────────────
function Card({ title, action, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0d4025" }}>{title}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

function Btn({ children, onClick, sm, ghost, full, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: ghost ? "transparent" : "#16a34a",
      color: ghost ? "#16a34a" : "#fff",
      border: ghost ? "1px solid #16a34a" : "none",
      borderRadius: 8,
      padding: sm ? "5px 11px" : "9px 18px",
      cursor: "pointer",
      fontSize: sm ? 12 : 13.5,
      fontWeight: 600,
      width: full ? "100%" : "auto",
      marginTop: full ? 8 : 0,
      opacity: disabled ? 0.5 : 1,
    }}>
      {children}
    </button>
  );
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={s.overlay}>
      <div style={{ ...s.modalBox, width: wide ? 500 : 420 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 17, color: "#0d4025", fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#94a3b8" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={s.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={s.input}
      />
    </div>
  );
}

function AreaField({ label, placeholder, value, onChange, rows = 2 }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={s.label}>{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        style={{ ...s.input, resize: "vertical", fontFamily: "inherit" }}
      />
    </div>
  );
}

function Fields({ form, setForm, fields }) {
  return fields.map((f) => (
    <Field key={f.key} label={f.label} type={f.type} placeholder={f.placeholder}
      value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })}
    />
  ));
}

function Pills({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
      {options.map((o) => (
        <button key={o.val} onClick={() => onChange(o.val)} style={{
          padding: "5px 13px",
          borderRadius: 99,
          border: "1px solid",
          borderColor: value === o.val ? "#16a34a" : "#e2e8f0",
          background: value === o.val ? "#16a34a" : "#fff",
          color: value === o.val ? "#fff" : "#64748b",
          cursor: "pointer",
          fontSize: 12.5,
          fontWeight: value === o.val ? 600 : 400,
        }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Empty({ icon, msg, padded }) {
  return (
    <div style={{ textAlign: "center", padding: padded ? "60px 0" : "24px 0", color: "#94a3b8" }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>{icon}</div>
      <p style={{ margin: 0, fontSize: 13 }}>{msg}</p>
    </div>
  );
}

// ─── STYLES ────────────────────────────────────────────────────────────────
const s = {
  shell:       { display: "flex", height: "100vh", background: "#f8fdf9", fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif", overflow: "hidden" },
  center:      { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f0fdf4" },
  spinner:     { width: 32, height: 32, border: "3px solid #dcfce7", borderTop: "3px solid #22c55e", borderRadius: "50%", animation: "spin 0.8s linear infinite" },

  // Sidebar
  sidebar:     { width: 210, background: "#0d4025", display: "flex", flexDirection: "column", padding: "20px 0", flexShrink: 0 },
  brand:       { display: "flex", flexDirection: "column", gap: 6, padding: "0 14px 18px", borderBottom: "1px solid #14532d" },
  logoWrap:    { background: "#fff", borderRadius: 10, padding: "8px 10px", width: "100%", boxSizing: "border-box" },
  brandSub:    { color: "#4ade80", fontSize: 10.5, textAlign: "center", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 },
  nav:         { padding: "14px 10px", flex: 1 },
  navBtn:      { display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer", textAlign: "left", background: "transparent", color: "#86efac", fontSize: 13, fontWeight: 500, marginBottom: 2 },
  navBtnActive:{ background: "#16a34a", color: "#fff", fontWeight: 700 },
  clock:       { padding: "16px 18px", borderTop: "1px solid #14532d" },
  clockTime:   { color: "#fff", fontSize: 20, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" },
  clockDate:   { color: "#4ade80", fontSize: 11, marginTop: 2 },

  // Main
  main:        { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" },
  page:        { padding: 30, maxWidth: 900 },
  pageHeader:  { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 },
  h1:          { margin: 0, fontSize: 22, fontWeight: 800, color: "#0d4025", letterSpacing: "-0.02em" },
  sub:         { margin: "4px 0 0", color: "#64748b", fontSize: 13 },
  groupLabel:  { fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 },

  // Events
  eventRow:    { display: "flex", gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid #f1f5f9" },
  eventTime:   { fontSize: 12, fontWeight: 700, color: "#16a34a", minWidth: 46, paddingTop: 2 },
  eventTitle:  { fontSize: 13.5, fontWeight: 600, color: "#0f172a" },
  eventMeta:   { fontSize: 12, color: "#94a3b8", marginTop: 2 },

  // Schedule card
  scheduleCard:{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 14 },
  scheduleTime:{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "8px 10px", textAlign: "center", fontSize: 13, fontWeight: 700, color: "#16a34a", minWidth: 56 },

  // Tasks
  taskCard:    { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 },
  taskRow:     { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f1f5f9" },
  taskTitle:   { fontSize: 13.5, fontWeight: 500, color: "#0f172a" },
  taskMeta:    { fontSize: 11.5, color: "#94a3b8" },
  circle:      { width: 22, height: 22, borderRadius: "50%", border: "2px solid #d1d5db", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },

  // Decisions
  decCard:     { background: "#fff", border: "1px solid #e2e8f0", borderLeft: "4px solid #22c55e", borderRadius: 10, padding: 18, marginBottom: 12, display: "flex" },
  decLabel:    { fontSize: 10.5, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 },
  decText:     { fontSize: 13, color: "#334155", lineHeight: 1.55 },

  // AI
  avatar:      { width: 32, height: 32, background: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, marginRight: 8 },
  quickBtn:    { padding: "5px 12px", borderRadius: 99, border: "1px solid #bbf7d0", background: "#f0fdf4", color: "#166534", cursor: "pointer", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" },

  // Forms
  label:       { fontSize: 11.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" },
  input:       { width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13.5, outline: "none", boxSizing: "border-box", background: "#fff", color: "#0f172a" },
  select:      { width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13.5, outline: "none", background: "#fff" },

  // Modal
  overlay:     { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 },
  modalBox:    { background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 24px 64px rgba(0,0,0,0.18)", maxHeight: "88vh", overflowY: "auto" },

  // Misc
  del: { background: "none", border: "none", cursor: "pointer", color: "#cbd5e1", fontSize: 15, padding: 4, lineHeight: 1 },
};
