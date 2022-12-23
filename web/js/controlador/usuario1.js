const usuarios = [    
    new Usuario("EstebanGT", "gualinga@yavirac.edu.ec", "789456"),
    new Usuario("BillyS", "salmeron@yavirac.edu.ec", "102030"),
    new Usuario("YulL", "loor@yavirac.edu.ec", "212223"),
    new Usuario("SantiagoV", "venegas@yavirac.edu.ec", "313233"),
    new Usuario("Usuario1", "Usuario1@yavirac.edu.ec", "123456"),
    new Usuario("Admin1", "Admin1@yavirac.edu.ec", "654321"),
]

function obtener() {
    return usuarios;
}

function editarusuario(i, newnickname, newemail, newpassword) {
    usuarios[i].nickname = newnickname
    usuarios[i].email = newemail
    usuarios[i].password = newpassword
}

function borrarusuario(i) {
    usuarios.splice(i, 1);
}