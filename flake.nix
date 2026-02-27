{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { nixpkgs, ... }:
    let
      forAllSystems =
        with nixpkgs.lib;
        f: genAttrs systems.flakeExposed (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs: {
        default =
          with pkgs;
          mkShell {
            buildInputs = [
              postgresql_17
              bun
              nodejs
              nodePackages.prettier
              openssl

              python3
              python3.pkgs.pip
            ];
            shellHook = ''
              export PG=$PWD/.dev_postgres/
              export PGDATA="$PG"data
              export PGPORT=5432
              export PGHOST=localhost
              export PGUSER=$USER
              export PGPASSWORD=postgres
              export PGDATABASE=example
              export DATABASE_URL=postgres://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE

              pg_setup() {
                pg_stop;
                rm -rf $PG;
                initdb -D $PGDATA &&
                echo "unix_socket_directories = '$PGDATA'" >> $PGDATA/postgresql.conf &&
                pg_ctl -D $PGDATA -l $PG/postgres.log start &&
                createdb
              }

              alias pg_start="pg_ctl -D $PGDATA -l $PG/postgres.log start"
              alias pg_stop="pg_ctl -D $PGDATA stop"
              alias pg_drop="psql -U $PGUSER -c 'DROP DATABASE $PGDATABASE'"
              alias exit="(! pidof postgres || pg_ctl -D $PGDATA stop) && exit"
            '';
          };
      });
    };
}
