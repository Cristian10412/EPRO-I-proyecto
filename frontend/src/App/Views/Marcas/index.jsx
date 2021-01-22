import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import EncabezadoTabla from '../../Components/Tabla/EncabezadoTabla';
import { Creators } from '../../Core/Redux/Actions';
import MenuCRUD from '../../Components/MenuCRUD';
import Boton from '../../Components/Boton';

export default function Marcas() {
  // * estabo para filtro globar
  const [buscaGlobal, setsuscaGlobal] = useState();

  const [MarcasEstado, setMarca] = useState({
    IdMarca: '',
    Marca: ''
  });

  const [TextoBtn, setTextoBtn] = useState('Guardar');

  // * estado para fial seleccionada
  const [filaSelecionada, setFilaSelecionada] = useState();
  // * hooks de react-redux
  const dispatch = useDispatch();
  // * seleccionand del estado  enviado por props
  // const { datos } = useSelector(state => state.Marcas);
  const { numero } = useSelector(state => state.empleados);

  // * bind de los datos del estado
  /* useEffect(() => {
    dispatch(Creators.PeticionGetAPIMarcas());
  }, [dispatch]);
*/
  // * refeencia para el toast
  const toast = React.useRef();

  // *  configuracion del toas
  const selecionFila = event => {
    toast.current.show({
      severity: 'info',
      summary: `Marca Seleccionada`,
      detail: `Marca: ${event.data.Marca}`,
      life: 1000
    });

    if (TextoBtn !== 'Guardar') setMarca(event.data);
  };

  // * componente para el encabezado
  const header = <EncabezadoTabla setsuscaGlobal={setsuscaGlobal} titulo={`Marcas ${numero}`} />;

  const IconoCancelar = `${process.env.PUBLIC_URL}/Iconos/icons8-close-window.svg`;
  const IconoAceptar =
    TextoBtn === 'Eliminar'
      ? `${process.env.PUBLIC_URL}/Iconos/icons8-trash.svg`
      : `${process.env.PUBLIC_URL}/Iconos/icons8-save.svg`;
  // * bind de los datos del estado

  const handleSubmit = e => {
    e.preventDefault();
    const carga = { ...MarcasEstado };
    console.log('Emplead: ', carga);
    dispatch(Creators.Incrementar());
    console.log('Creators', Creators.Incrementar());
    console.log(numero);
  };

  const handleReset = e => {
    e.preventDefault();
    e.target.reset();
    setMarca({
      IdMarca: '',
      Marca: ''
    });
  };

  return (
    <div className="contenedor base ajusteFormulario">
      <div style={{ width: '45%' }}>
        <MenuCRUD
          funTextIngresar={() => {
            setTextoBtn('Guardar');
            setMarca({
              IdMarca: '',
              Marca: ''
            });
          }}
          funTextActualizar={() => {
            setTextoBtn('Actualizar');
          }}
          funTextEliminar={() => {
            setTextoBtn('Eliminar');
          }}
        />
        <div>
          <form id="frmMarcas" onSubmit={e => handleSubmit(e)} onReset={e => handleReset(e)}>
            <div className="contenedor formulario AjusFrm">
              <span className="p-float-label">
                <InputText
                  id="IdMarca"
                  name="IdMarca"
                  value={MarcasEstado.IdMarca}
                  onChange={e => setMarca({ ...MarcasEstado, [e.target.name]: e.target.value })}
                  required
                />
                <label htmlFor="IdMarca">ID</label>
              </span>

              <span className="p-float-label">
                <InputText
                  id="Marca"
                  name="Marca"
                  value={MarcasEstado.Marca}
                  onChange={e => setMarca({ ...MarcasEstado, [e.target.name]: e.target.value })}
                  required
                />
                <label htmlFor="Marca">Nombre</label>
              </span>
            </div>
            <div className="contenedor formulario" style={{ marginRight: '2px !important' }}>
              <span className="p-float-label ajusteSpam">
                <div className="ajusteBtnFrm">
                  <Boton
                    idProp="frm_Marcas_Cancelar"
                    type="reset"
                    style={{ backgroundColor: '#F44336' }}
                    Texto="Cancelar"
                    Icono={<img src={IconoCancelar} alt="" width="30px" />}
                  />
                </div>

                <div className="ajusteBtnFrm">
                  <Boton
                    idProp="frm_Marcas_Aceptar"
                    type="submit"
                    style={{ backgroundColor: '#27ae60' }}
                    reset
                    Texto={TextoBtn}
                    Icono={<img src={IconoAceptar} alt="" width="30px" />}
                  />
                </div>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div style={{ width: '55%' }}>
        <Toast ref={toast} style={{ top: '40px' }} />
        <DataTable
          value={[]}
          scrollable
          scrollHeight="76vh"
          style={{ height: '-webkit-fill-available', width: '-webkit-fill-available' }}
          selection={filaSelecionada}
          onSelectionChange={e => setFilaSelecionada(e.value)}
          selectionMode="single"
          dataKey="IdMarca"
          onRowSelect={e => selecionFila(e)}
          header={header}
          globalFilter={buscaGlobal}
          emptyMessage="Nose Encontraron Registros."
        >
          <Column
            className="fuente"
            field="IdMarca"
            header="ID"
            style={{
              padding: '0.5rem 0.5rem',
              borderRight: '1px ridge gray'
            }}
            headerStyle={{
              padding: '0.8rem 0.8rem',
              borderRight: '1px ridge gray',
              textAlign: 'center'
            }}
          />

          <Column
            className="fuente"
            field="Marca"
            header="Nombre"
            style={{ padding: '0.5rem 0.5rem' }}
            headerStyle={{
              padding: '0.8rem 0.8rem',
              textAlign: 'center'
            }}
          />
        </DataTable>
      </div>
    </div>
  );
}
