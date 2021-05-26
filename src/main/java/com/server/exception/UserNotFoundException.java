package com.server.exception;

import java.io.IOException;

public class UserNotFoundException extends IOException {

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
