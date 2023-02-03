const armarPC = document.getElementById("armarpcya");
        const tabla   = document.getElementById("seleccion-productos-tabla");
        const tablaCuerpo = document.getElementById("seleccion-productos-tabla-body");

        armarPC.addEventListener('click', function(){
            tablaCuerpo.innerHTML = "";
            let totalValue = 0;
            const producto1 = document.getElementById("productosarm1").value;
            const producto2 = document.getElementById("productosarm2").value;
            const producto3 = document.getElementById("productosarm3").value;
            const producto4 = document.getElementById("productosarm4").value;
            const producto5 = document.getElementById("productosarm5").value;
            const producto6 = document.getElementById("productosarm6").value;
            const seleccionProduct = [producto1, producto2, producto3, producto4, producto5, producto6];

            for (const producto of seleccionProduct){
                if (!producto){
                    alert("Si de verdad deseas armar tu PC Gamer selecciona los 9 componentes por favor");
                    return;
                }
            }

            for (const producto of seleccionProduct){
                if(producto){
                    const partesProducto = producto.split(" - $");
                    const nombreProducto = partesProducto[0];
                    const validarProducto= parseInt(partesProducto[1]);
                    totalValue += validarProducto;
                    const row = `<tr><td>${nombreProducto}</td><td>$${validarProducto}</td></tr>`;
                    tablaCuerpo.innerHTML += row;
                }
            }
            tablaCuerpo.innerHTML += `<tr><td><b>Total</b></td><td><b>$${totalValue}</b></td></tr>`;
            tabla.style.display = "table";
        })

        function resetPage() {
            // Reiniciar la página
            location.reload();
            }