export interface components {
  schemas: {
    AuthDto: {
      firstName?: string;
      lastName?: string;
      email: string;
      password: string;
    };
    CreateTaskDto: {
      title: string;
      description?: string;
    };
    EditTaskDto: {
      title?: string;
      description?: string;
    };
    EditUserDto: {
      email?: string;
      firstName?: string;
      lastName?: string;
    };
  };
}
