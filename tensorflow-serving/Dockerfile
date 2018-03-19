FROM epigramai/model-server:light-1.5

COPY ./models/ /models/

CMD ["--port=9000", "--model_name=covfefe-flow", "--model_base_path=/models/covfefe-flow/"]