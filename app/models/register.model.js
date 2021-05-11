module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      email: String,
      mobile: String,
      activated: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Register = mongoose.model("register_event", schema);
  return Register;
};
