package com.server.entity;

public class RespResult<T> {

    private String code;

    private T data;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static RespResult build(Object data) {
        return build("200", data);
    }

    public static RespResult build(String code, Object data) {
        RespResult<Object> result = new RespResult<>();
        result.setCode(code);
        result.setData(data);
        return result;
    }
}
