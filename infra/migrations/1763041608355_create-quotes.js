exports.up = (pgm) => {
  pgm.createTable("quotes", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    emoji: {
      type: "varchar(10)",
      notNull: true,
    },

    quote: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },

    autor: {
      type: "varchar(127)",
      notNull: true,
    },

    //Why timestamp with time zone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });
};

exports.down = false;
