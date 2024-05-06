class AddCustomHeader
    def initialize(app)
      @app = app
    end
  
    def call(env)
      status, headers, response = @app.call(env)

      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Credentials'] = 'true'
      headers['Access-Control-Allow-Headers'] = 'origin, content-type, accept, authorization, request_Authentication, request_Connection, request_key'
      headers['Access-Control-Allow-Methods'] = 'GET'
  
      [status, headers, response]
    end
  end
  